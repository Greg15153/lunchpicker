import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import UsersModule from '../modules/users/users-module'
import { DatabaseModule } from '../modules/database/database-module'
import appConfig from './app-config'
import { BusinessesModule } from '../modules/businesses/businesses-module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
            envFilePath: `${__dirname}/../../../.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
        }),
        BusinessesModule,
        DatabaseModule,
        UsersModule
    ],
    controllers: [AppController]
})
export class AppModule {}
