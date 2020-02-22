import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import yelpConfig from './yelp-config'
import BusinessesService from './businesses-service'
import YelpBusinessesQueries from './infrastructure/yelp/yelp-businesses-queries'
import { BusinessesQueriesTypeName } from './infrastructure/businesses-queries'
import BusinessesController from './businesses-controller'

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
