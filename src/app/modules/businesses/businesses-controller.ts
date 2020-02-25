import { Body, Controller, Post } from '@nestjs/common'

import BusinessesService from './businesses-service'
import SearchOptions from './dtos/search-options'
import Business from './models/business'

@Controller('businesses')
class BusinessesController {
    public constructor(private readonly businessesService: BusinessesService) {}

    // API
    @Post()
    async getBusinesses(@Body() searchOptions: SearchOptions): Promise<Business[]> {
        return this.businessesService.getBusinesses(searchOptions)
    }
}

export default BusinessesController
