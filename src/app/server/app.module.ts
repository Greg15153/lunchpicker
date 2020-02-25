import fs from 'fs'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces'

import { BusinessesModule } from '../modules/businesses/businesses-module'
import { DatabaseModule } from '../modules/database/database-module'
import UsersModule from '../modules/users/users-module'
import appConfig from './app-config'
import { AppController } from './app.controller'

function getEnvFileConfiguration(): ConfigModuleOptions {
    const env = process.env.NODE_ENV

    // Only support Env vars for prod
    if (env?.toLowerCase() === 'production') {
        return {
            ignoreEnvFile: true
        }
    }

    let relative = '/../../../'

    if (__dirname.includes('dist')) {
        relative = '/../../../../'
    }

    const path = `${__dirname}${relative}.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`

    try {
        fs.exists(path, exists => {
            if (exists) {
                return {
                    envFilePath: path,
                    ignoreEnvFile: false
                }
            } else {
                return {
                    ignoreEnvFile: true
                }
            }
        })
    } catch {
        return {
            ignoreEnvFile: true
        }
    }
}

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            isGlobal: true,
            ...getEnvFileConfiguration()
        }),
        BusinessesModule,
        DatabaseModule,
        UsersModule
    ],
    controllers: [AppController]
})
export class AppModule {}
