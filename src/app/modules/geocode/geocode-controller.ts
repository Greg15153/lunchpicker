import { Controller, Get, Query } from '@nestjs/common'

import GeocodeService from './geocode-service'

@Controller('geocode')
class GeocodeController {
    public constructor(private readonly geocodeService: GeocodeService) {}

    @Get('reverse')
    async reverseCoordinates(
        @Query('longitude') longitude: number,
        @Query('latitude') latitude: number
    ): Promise<string> {
        return this.geocodeService.reverse({ longitude, latitude })
    }
}

export default GeocodeController
