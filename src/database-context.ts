import { Client, ClientConfig } from 'pg'
import { injectable } from 'inversify'

@injectable()
export class DatabaseConfig implements ClientConfig { }

@injectable()
class DatabaseContext {
    // TODO: Create a function that connects, disconnects and executes a query that a consumer provides
    public _client: Client

    public constructor(databaseConfig: DatabaseConfig) {
        this._client = new Client(databaseConfig)
    }
}

export default DatabaseContext