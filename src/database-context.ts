import { Pool, PoolConfig } from 'pg'
import { injectable } from 'inversify'

@injectable()
export class DatabaseConfig implements PoolConfig {}

@injectable()
class DatabaseContext {
    public _pool: Pool

    public constructor(databaseConfig: DatabaseConfig) {
        this._pool = new Pool(databaseConfig)
    }
}

export default DatabaseContext
