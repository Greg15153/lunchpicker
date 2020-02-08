import { injectable } from 'inversify'
import DatabaseContext from '../database-context'
import UserService from './user-service'
import User from './user'

@injectable()
class PostgresUserService implements UserService {
    private _databaseContext: DatabaseContext

    public constructor(databaseContext: DatabaseContext) {
        this._databaseContext = databaseContext
    }

    public async getUser(id: string): Promise<User> {
        // TODO: Implement real call
        await this._databaseContext._client.connect()

        const res = await this._databaseContext._client.query('SELECT $1::text as message', ['Hello world!'])

        console.log(res.rows[0].message + id)

        await this._databaseContext._client.end()

        return null
    }
}

export default PostgresUserService