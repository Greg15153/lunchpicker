import Business from '../models/business'
import SearchOptions from '../dtos/search-options'

interface BusinessesQueries {
    getBusinesses(searchOptions: SearchOptions): Promise<Business[]>
}

export const BusinessesQueriesTypeName = 'BusinessesQueries'

export default BusinessesQueries
