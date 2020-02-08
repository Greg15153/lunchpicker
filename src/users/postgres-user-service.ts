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
        const query = {
            text: `
                SELECT id
                    , first_name AS "firstName"
                    , last_name AS "lastName"
                FROM user_v1
                WHERE id = $1::uuid;
            `,
            values: [id]
        }

        const res = await this._databaseContext._pool.query<User>(query)

        if (res.rows.length > 1) {
            throw new Error('Multiple users found with Id')
        }

        return res.rows?.[0]
    }
}

export default PostgresUserService
