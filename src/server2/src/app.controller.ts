import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

interface User {
    name: string
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    public showHome(): User {
        const user = { name: 'NestJS' }

        return user
    }

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
