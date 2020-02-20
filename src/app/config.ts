import dotenv from 'dotenv'

let path

switch (process.env.NODE_ENV) {
    case 'development':
        path = `../../.env.development`
        break
    case 'test':
        path = `../../.env.test`
        break
    case 'production':
        path = `../../../.env.production`
        break
    default:
        path = `../../../.env`
}

dotenv.config({ path })

const config = {
    database: {
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
    },
    system: {
        adminId: '090b3e9a-7a7f-4da0-b0b5-6d4707178791'
    }
}

export default config
