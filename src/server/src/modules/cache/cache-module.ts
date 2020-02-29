import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import cacheConfig from './cache-config'
import CacheContext from './cache-context'

@Module({
    imports: [ConfigModule.forFeature(cacheConfig)],
    providers: [CacheContext],
    exports: [CacheContext]
})
export class CacheModule {}
