import { Pool, PoolConfig, QueryConfig, QueryResultRow, QueryResult } from 'pg'
import { injectable } from 'inversify'

@injectable()
export class DatabaseConfig implements PoolConfig {}

@injectable()
class DatabaseContext {
    private _pool: Pool

    public constructor(databaseConfig: DatabaseConfig) {
        this._pool = new Pool(databaseConfig)
    }

    public async query<R extends QueryResultRow>(queryConfig: QueryConfig): Promise<QueryResult<R>> {
        return this._pool.query(queryConfig)
    }

    public async transaction<R extends QueryResultRow>(queryConfig: QueryConfig): Promise<QueryResult<R>> {
        const results = await this.transactions<R>([queryConfig])

        return results?.[0]
    }

    public async transactions<R extends QueryResultRow>(queryConfigs: QueryConfig[]): Promise<QueryResult<R>[]> {
        const client = await this._pool.connect()

        try {
            await client.query('BEGIN')

            const results: QueryResult<R>[] = []

            queryConfigs.forEach(async queryConfig => {
                const res = await client.query(queryConfig)

                results.push(res)
            })

            await client.query('COMMIT')

            return results
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }
}

export default DatabaseContext
