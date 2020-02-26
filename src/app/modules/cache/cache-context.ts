import Redis from 'ioredis'

class Cache {
    private _cache

    constructor() {
        this._cache = new Redis()
    }
}

export default Cache
