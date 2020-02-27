import { registerAs } from '@nestjs/config'
import { RedisOptions } from 'ioredis'

export default registerAs(
    'cache',
    (): RedisOptions => ({
        host: process.env.CACHE_HOST,
        port: parseInt(process.env.CACHE_PORT) || 6379
    })
)
