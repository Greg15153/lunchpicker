import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import Redis from 'ioredis'

import cacheConfig from './cache-config'

@Injectable()
class Cache {
    private _cache

    constructor(@Inject(cacheConfig.KEY) configuration: ConfigType<typeof cacheConfig>) {
        this._cache = new Redis(configuration)
    }

    public async get<R>(key: string): Promise<R> {
        return (await this._cache.get(key)) as R
    }

    public async set<R>(key: string, value: R): Promise<boolean> {
        return 'OK' === (await this._cache.set(key, value))
    }

    public async ping(): Promise<void> {
        await this._cache.ping('test')
    }
}

export default Cache
