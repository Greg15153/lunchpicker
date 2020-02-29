import { Module } from '@nestjs/common'
import { CacheModule } from 'src/modules/cache/cache-module'

import { DatabaseModule } from '../database/database-module'
import PostgresUsersRepository from './infrastructure/postgres-user-repository'
import { UsersRepositoryTypeName } from './infrastructure/users-repository'
import UsersService from './user-service'
import UsersController from './users-controller'

@Module({
    imports: [DatabaseModule, CacheModule],
    controllers: [UsersController],
    providers: [
        {
            provide: UsersRepositoryTypeName,
            useClass: PostgresUsersRepository
        },
        UsersService
    ],
    exports: [UsersService]
})
export default class UsersModule {}
