import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Options } from 'ky'
import ky from 'ky-universal'
import queryString from 'query-string'

import locationiqConfig from './locationiq-config'

interface Coordinates {
    latitude: number
    longitude: number
}

interface ReverseGeocodeResponse {
    place_id: string
    lat: number
    lon: number
    display_name: string
}

@Injectable()
class GeocodeService {
    private readonly defaultOptions: Options
    private readonly token: string

    constructor(
        @Inject(locationiqConfig.KEY)
        configuration: ConfigType<typeof locationiqConfig>
    ) {
        this.defaultOptions = {
            prefixUrl: 'https://us1.locationiq.com/v1',
            retry: 3
        }
        this.token = configuration.token
    }

    async reverse(coordinates: Coordinates): Promise<string> {
        const queryString = this.getQueryString({
            lat: coordinates.latitude,
            lon: coordinates.longitude
        })

        const response = (await ky
            .get(`reverse.php?${queryString}`, this.defaultOptions)
            .json()) as ReverseGeocodeResponse

        return response.display_name
    }

    private getQueryString(o: object): string {
        const query = {
            ...o,
            key: this.token,
            format: 'json'
        }

        return queryString.stringify(query)
    }
}

export default GeocodeService
