import { registerAs } from '@nestjs/config'

interface AppConfig {
    adminId: string
}

export default registerAs(
    'app',
    (): AppConfig => ({
        adminId: '090b3e9a-7a7f-4da0-b0b5-6d4707178791'
    })
)
