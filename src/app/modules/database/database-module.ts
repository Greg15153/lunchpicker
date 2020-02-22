import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import DatabaseContext from './database-context'
import databaseConfig from './database-config'

@Global()
@Module({
    imports: [ConfigModule.forFeature(databaseConfig)],
    providers: [DatabaseContext],
    exports: [DatabaseContext]
})
export class DatabaseModule {}
