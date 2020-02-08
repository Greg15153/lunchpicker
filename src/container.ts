import { Container } from 'inversify'
import UserService from './users/user-service'
import DatabaseContext, { DatabaseConfig } from './database-context'
import PostgresUserService from './users/postgres-user-service'

const container = new Container()

export function configureContainer(): void {
    const databaseConfig: DatabaseConfig = {
        user: 'postgres',
        database: 'lunchpicker',
        password: 'yourStrong(!)Password',
        host: '10.0.75.1'
    }

    container.bind<DatabaseConfig>(DatabaseConfig).toConstantValue(databaseConfig)
    container.bind<DatabaseContext>(DatabaseContext).to(DatabaseContext)
    container.bind<UserService>(PostgresUserService).to(PostgresUserService)
}

export default container