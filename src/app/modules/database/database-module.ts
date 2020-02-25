import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import databaseConfig from './database-config'
import DatabaseContext from './database-context'

@Global()
@Module({
    imports: [ConfigModule.forFeature(databaseConfig)],
    providers: [DatabaseContext],
    exports: [DatabaseContext]
})
export class DatabaseModule {}
