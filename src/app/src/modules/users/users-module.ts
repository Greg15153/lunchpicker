import { Module } from '@nestjs/common'
import UsersController from './users-controller'
import PostgresUsersRepository from './infrastructure/postgres-user-repository'
import UsersService from './user-service'
import { DatabaseModule } from '../database/database-module'
import { UsersRepositoryTypeName } from './infrastructure/users-repository'

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
        {
            provide: UsersRepositoryTypeName,
            useClass: PostgresUsersRepository
        },
        UsersService
    ]
})
export default class UsersModule {}
