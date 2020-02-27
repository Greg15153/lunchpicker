import { Injectable } from '@nestjs/common'
import CacheContext from 'modules/cache/cache-context'
import DatabaseContext from 'modules/database/database-context'
import Result, { Err, Ok } from 'util/result'

import HealthCheck from './models/healthcheck'

@Injectable()
class HealthCheckService {
    public constructor(
        private readonly databaseContext: DatabaseContext,
        private readonly cacheContext: CacheContext
    ) {}

    async healthcheck(): Promise<boolean> {
        const database = await this.database()
        const yelp = await this.yelp()
        const cache = await this.cache()

        /*
        // Log result, we don't want to tell external users whats exactly wrong
        const result = {
            database: database.isOk,
            yelp: yelp.isOk
        }
        */

        return database.isOk && yelp.isOk && cache.isOk
    }

    private async yelp(): Promise<Result<void, Error>> {
        // TODO: Save Yelp DailyLimit, Remanining and Reset times
        // after each yelp call so we know we're about to hit limits
        // For now just always assume yelp is running
        // https://www.yelp.com/developers/documentation/v3/rate_limiting
        return new Ok()
    }

    private async cache(): Promise<Result<void, Error>> {
        try {
            await this.cacheContext.ping()
            return new Ok()
        } catch (ex) {
            return new Err(ex)
        }
    }

    private async database(): Promise<Result<void, Error>> {
        const query = {
            text: 'SELECT NOW()'
        }

        try {
            await this.databaseContext.query(query)
            return new Ok()
        } catch (ex) {
            return new Err(ex)
        }
    }
}

export default HealthCheckService
