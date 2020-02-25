import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import BusinessesController from './businesses-controller'
import BusinessesService from './businesses-service'
import { BusinessesQueriesTypeName } from './infrastructure/businesses-queries'
import YelpBusinessesQueries from './infrastructure/yelp/yelp-businesses-queries'
import yelpConfig from './yelp-config'

@Global()
@Module({
    imports: [ConfigModule.forFeature(yelpConfig)],
    controllers: [BusinessesController],
    providers: [
        {
            provide: BusinessesQueriesTypeName,
            useClass: YelpBusinessesQueries
        },
        BusinessesService
    ]
})
export class BusinessesModule {}
