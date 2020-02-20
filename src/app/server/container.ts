import 'reflect-metadata'
import { Container } from 'inversify'
import UserService from './users/user-service'
import DatabaseContext, { DatabaseConfig } from './util/database-context'
import PostgresUserService from './users/postgres-user-service'
import config from '../config'

// types
export const TYPES = {
    DatabaseContext: 'DatabaseContext',
    DatabaseConfig: 'DatabaseConfig',
    UserService: 'UserService'
}

// container
const container = new Container()

const databaseConfig: DatabaseConfig = {
    ...config.database
}

container.bind<DatabaseConfig>(TYPES.DatabaseConfig).toConstantValue(databaseConfig)
container
    .bind<DatabaseContext>(TYPES.DatabaseContext)
    .to(DatabaseContext)
    .inSingletonScope()
container.bind<UserService>(TYPES.UserService).to(PostgresUserService)

export default container
