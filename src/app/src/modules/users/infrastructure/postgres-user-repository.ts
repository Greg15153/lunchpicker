import { Injectable } from '@nestjs/common'
import DatabaseContext from '../../database/database-context'
import User from '../models/user'
import UsersRepository from './users-repository'

@Injectable()
class PostgresUsersRepository implements UsersRepository {
    private _databaseContext: DatabaseContext

    public constructor(databaseContext: DatabaseContext) {
        this._databaseContext = databaseContext
    }

    public async getUser(id: string): Promise<User> {
        // TODO: Figure out if PG Supports object mapping better
        const query = {
            text: `
                SELECT id
                    , first_name AS "firstName"
                    , last_name AS "lastName"
                    , created_by as "metadata:createdBy"
                    , created_date as "metadata:createdDate"
                    , modified_by as "metadata:modifiedBy"
                    , modified_date as "metadata:modifiedDate"
                FROM user_v1
                WHERE id = $1::uuid;
            `,
            values: [id]
        }

        const res = await this._databaseContext.query<User>(query)

        if (res.rows.length > 1) {
            throw new Error('Multiple users found with Id')
        }

        // TODO: Return actual User object not Database return
        return res.rows?.[0]
    }

    public async addUser(user: User): Promise<void> {
        const query = {
            text: `
                INSERT INTO user_v1 (
                    id
                    , first_name
                    , last_name
                    , created_by
                    , created_date
                    , modified_by
                , modified_date
                ) VALUES (
                    $1::uuid
                    , $2::text
                    , $3::text
                    , $4::uuid
                    , CURRENT_TIMESTAMP
                    , $4::uuid
                    , CURRENT_TIMESTAMP
                )
            `,
            values: [user.id, user.firstName, user.lastName, user.metadata?.createdBy]
        }

        await this._databaseContext.transaction(query)
    }
}

export default PostgresUsersRepository
