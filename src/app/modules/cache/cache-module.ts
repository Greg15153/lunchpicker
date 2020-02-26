import { Module } from '@nestjs/common'

import CacheContext from './cache-context'

@Module({
    providers: [CacheContext],
    exports: [CacheContext]
})
export class CacheModule {}
