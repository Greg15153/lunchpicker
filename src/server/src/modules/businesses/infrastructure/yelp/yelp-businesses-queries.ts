import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Options } from 'ky'
import Ky from 'ky-universal'
import queryString from 'query-string'

import SearchOptions from '../../dtos/search-options'
import Business from '../../models/business'
import yelpConfig from '../../yelp-config'
import BusinessesQueries from '../businesses-queries'
import SearchQuery from './models/SearchQuery'
import SearchResponse, { toDomain as SearchResponseToDomain } from './models/SearchResponse'

@Injectable()
class YelpBusinessesQueries implements BusinessesQueries {
    private readonly defaultOptions: Options

    public constructor(@Inject(yelpConfig.KEY) configuration: ConfigType<typeof yelpConfig>) {
        this.defaultOptions = {
            prefixUrl: 'https://api.yelp.com/v3/businesses',
            retry: 3,
            headers: {
                Authorization: `Bearer ${configuration.apiKey}`
            }
        }
    }

    async getBusinesses(searchOptions: SearchOptions): Promise<Business[]> {
        const searchQuery = new SearchQuery(searchOptions)
        const query = queryString.stringify(searchQuery)
        const businesses = (await Ky.get(`search?category=food&${query}`, this.defaultOptions).json()) as SearchResponse

        return SearchResponseToDomain(businesses)
    }
}

export default YelpBusinessesQueries
