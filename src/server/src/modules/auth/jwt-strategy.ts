import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

import authConfig from './auth-config'

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(authConfig.KEY) configuration: ConfigType<typeof authConfig>) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: configuration.audience,
            issuer: configuration.issuer,
            algorithms: ['RS256']
        })
    }

    validate(payload: unknown): unknown {
        return payload
    }
}

export default JwtStrategy
