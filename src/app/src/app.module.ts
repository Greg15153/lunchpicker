import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import UsersModule from './modules/users/users-module'
import { DatabaseModule } from './modules/database/database-module'
import appConfig from './app-config'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
            envFilePath: __dirname + '/../../../.env'
        }),
        UsersModule,
        DatabaseModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
