import { registerAs } from '@nestjs/config'
import { PoolConfig } from 'pg'

type DatabaseConfig = PoolConfig

export default registerAs(
    'database',
    (): DatabaseConfig => ({
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 5432
    })
)
