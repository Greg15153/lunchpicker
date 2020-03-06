using System.Reflection;
using LunchPicker.API.Application.Queries;
using LunchPicker.Domain.Aggregates.UserAggregate;
using LunchPicker.Infrastructure;
using LunchPicker.Infrastructure.Repositories;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LunchPicker.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddCustomMvc()
                .AddCustomDbContext(Configuration)
                .AddTransient<IUserQueries, UserQueries>()
                .AddTransient<IUserRepository, UserRepository>()
                .AddMediatR(typeof(Startup).GetTypeInfo().Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            // Add framework services.
            services.AddControllers(options =>
                {
                    //options.Filters.Add(typeof(HttpGlobalExceptionFilter));
                })
                // Added for functional tests
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            ;

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .SetIsOriginAllowed((host) => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            return services;
        }

        public static IServiceCollection AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LunchPickerContext>(options =>
                {
                    options.UseNpgsql(configuration.GetConnectionString("LunchPickerDatabase"));
                });

            return services;
        }
    }
}
