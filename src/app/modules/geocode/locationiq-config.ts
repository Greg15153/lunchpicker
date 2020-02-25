import { registerAs } from '@nestjs/config'

interface LocationIqConfig {
    token: string
}

export default registerAs(
    'locationIq',
    (): LocationIqConfig => ({
        token: process.env.LOCATIONIQ_TOKEN
    })
)
