import { registerAs } from '@nestjs/config'
import { IRedisOptions } from 'ioredis/built/redis/RedisOptions'

export default registerAs(
    'cache',
    (): IRedisOptions => ({
        host: '',
        port: ''
    })
)
