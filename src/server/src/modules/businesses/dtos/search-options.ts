interface Coordinates {
    latitude: number
    longitude: number
}

interface SearchOptions {
    location?: string
    coordinates?: Coordinates
    radius?: number
}

export default SearchOptions
