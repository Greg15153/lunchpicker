import { Controller, Get, Query } from '@nestjs/common'

import GeocodeService from './geocode-service'

interface ReverseGeocodeResult {
    location: string
}
@Controller('geocode')
class GeocodeController {
    public constructor(private readonly geocodeService: GeocodeService) {}

    @Get('reverse')
    async reverseCoordinates(
        @Query('longitude') longitude: number,
        @Query('latitude') latitude: number
    ): Promise<ReverseGeocodeResult> {
        const result = await this.geocodeService.reverse({ longitude, latitude })

        return {
            location: result
        }
    }
}

export default GeocodeController
