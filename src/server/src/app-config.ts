import { registerAs } from '@nestjs/config'

export enum Environment {
    Production,
    Development,
    Testing
}

export function getEnvironment(): Environment {
    const env = process.env.NODE_ENV

    return env ? Environment[env.charAt(0).toUpperCase() + env.substr(1)] : Environment.Production
}

interface AppConfig {
    adminId: string
}

export default registerAs(
    'app',
    (): AppConfig => ({
        adminId: '090b3e9a-7a7f-4da0-b0b5-6d4707178791'
    })
)
