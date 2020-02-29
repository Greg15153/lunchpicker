import Business from 'src/modules/businesses/models/business'

interface SearchResponse {
    businesses: SearchResponseBusiness[]
}

interface SearchResponseBusiness {
    id: string
    alias: string
    name: string
    image_url: string
    is_closed: boolean
    url: string
    review_count: number
    categories: SearchResponseCategory
    rating: number
    coordinates: Coordinates
    price: string
    location: SearchResponseLocation
    phone: string
    display_phone: string
    distance: number
}

interface SearchResponseCategory {
    alias: string
    title: string
}

interface SearchResponseLocation {
    address1: string
    address2: string
    address3: string
    city: string
    zip_code: string
    country: string
    state: string
    display_address: string[]
}

export const toDomain = (response: SearchResponse): Business[] => {
    const businesses = response?.businesses?.map(business => {
        return {
            id: business.id,
            name: business.name
        }
    })

    return businesses
}

export default SearchResponse
