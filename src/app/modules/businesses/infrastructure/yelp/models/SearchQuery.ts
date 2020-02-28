import SearchOptions from 'modules/businesses/dtos/search-options'

class SearchQuery {
    constructor(searchOptions: SearchOptions) {
        this.location = searchOptions.location
        this.latitude = searchOptions.coordinates?.latitude
        this.longitude = searchOptions.coordinates?.longitude

        if (searchOptions.radius && searchOptions.radius !== 0) {
            this.radius = Math.round(searchOptions.radius) / 0.00062137
        }
    }

    location?: string
    latitude?: number
    longitude?: number
    radius = 16093 // Default to 10 miles
}

export default SearchQuery
