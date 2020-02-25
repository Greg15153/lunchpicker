import { Inject } from '@nestjs/common'

import SearchOptions from './dtos/search-options'
import BusinessesQueries, { BusinessesQueriesTypeName } from './infrastructure/businesses-queries'
import Business from './models/business'

class BusinessesService {
    public constructor(@Inject(BusinessesQueriesTypeName) private readonly businessesQueries: BusinessesQueries) {}

    async getBusinesses(searchOptions: SearchOptions): Promise<Business[]> {
        return this.businessesQueries.getBusinesses(searchOptions)
    }
}

export default BusinessesService
