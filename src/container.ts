import { Container } from 'inversify'
import UserService from './users/user-service'
import DatabaseContext, { DatabaseConfig } from './database-context'
import PostgresUserService from './users/postgres-user-service'
import config from './config'

const container = new Container()

export function configureContainer(): void {
    const databaseConfig: DatabaseConfig = {
        ...config.database
    }

    container.bind<DatabaseConfig>(DatabaseConfig).toConstantValue(databaseConfig)
    container
        .bind<DatabaseContext>(DatabaseContext)
        .to(DatabaseContext)
        .inSingletonScope()
    container.bind<UserService>(PostgresUserService).to(PostgresUserService)
}

export default container
