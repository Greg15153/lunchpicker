import { registerAs } from '@nestjs/config'

interface YelpConfig {
    clientId?: string
    apiKey?: string
}

export default registerAs(
    'yelp',
    (): YelpConfig => ({
        clientId: process.env.YELP_CLIENT_ID,
        apiKey: process.env.YELP_API_KEY
    })
)
