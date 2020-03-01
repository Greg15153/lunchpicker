import { registerAs } from '@nestjs/config'

interface AuthConfig {
    audience: string
    issuer: string
}

export default registerAs(
    'auth',
    (): AuthConfig => ({
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_DOMAIN
    })
)
