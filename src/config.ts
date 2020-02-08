import * as dotenv from 'dotenv'

let path

switch (process.env.NODE_ENV) {
    case 'test':
        path = `${__dirname}/../.env.test`
        break
    case 'production':
        path = `${__dirname}/../.env.production`
        break
    default:
        path = `${__dirname}/../.env.development`
}

dotenv.config({ path })

const config = {
    database: {
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
    }
}

export default config
