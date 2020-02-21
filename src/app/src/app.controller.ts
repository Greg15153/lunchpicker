import { Controller, Get, Render, Param } from '@nestjs/common'
import User from './modules/users/models/user'
import UsersService from './modules/users/user-service'

@Controller()
export class AppController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Render('index')
    public showHome(): void {
        return
    }

    @Get('profile/:id')
    @Render('profile')
    public async showProfile(@Param('id') id: string): Promise<User> {
        return this.usersService.getUser(id)
    }
}
