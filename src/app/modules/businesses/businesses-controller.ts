import { Controller, Post, Body } from '@nestjs/common'
import BusinessesService from './businesses-service'
import Business from './models/business'
import SearchOptions from './dtos/search-options'

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
