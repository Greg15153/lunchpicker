import SearchOptions from '../dtos/search-options'
import Business from '../models/business'

interface BusinessesQueries {
    getBusinesses(searchOptions: SearchOptions): Promise<Business[]>
}

export const BusinessesQueriesTypeName = 'BusinessesQueries'

export default BusinessesQueries
