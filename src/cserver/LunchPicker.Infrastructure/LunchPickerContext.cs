using System;
using System.Threading;
using System.Threading.Tasks;
using LunchPicker.Domain.Aggregates.UserAggregate;
using LunchPicker.Domain.SeedWork;
using LunchPicker.Infrastructure.EntityConfigurations;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace LunchPicker.Infrastructure
{
    public class LunchPickerContext : DbContext, IUnitOfWork
    {
        public const string DEFAULT_SCHEMA = "lunchpicker";
        public static Guid ADMIN_ID = new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7");

        public DbSet<User> Users { get; set; }

        private readonly IMediator _mediator;

        private IDbContextTransaction _currentTransaction;

        public LunchPickerContext(DbContextOptions<LunchPickerContext> options) : base(options) { }

        public IDbContextTransaction GetCurrentTransaction() => _currentTransaction;

        public bool HasActiveTransaction => _currentTransaction != null;

        public LunchPickerContext(DbContextOptions<LunchPickerContext> options, IMediator mediator) : base(options)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClientRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());

            modelBuilder.Entity<User>().HasData(
                new User(ADMIN_ID, "Admin", "LunchPicker", new Metadata(ADMIN_ID, new DateTime(2020, 3, 6, 0, 0, 0), ADMIN_ID, new DateTime(2020, 3, 6, 0, 0, 0)))
                {
                    _id = 1
                }
            );
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEventsAsync(this);

            var result = await base.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                return null;
            }

            _currentTransaction = await Database.BeginTransactionAsync();

            return _currentTransaction;
        }

        public async Task CommitTransactionAsync(IDbContextTransaction transaction)
        {
            if (transaction == null)
            {
                throw new ArgumentNullException(nameof(transaction));
            }

            if (transaction != _currentTransaction)
            {
                throw new InvalidOperationException($"Transaction {transaction.TransactionId} is not current");
            }

            try
            {
                await SaveChangesAsync();
                transaction.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }
    }
}