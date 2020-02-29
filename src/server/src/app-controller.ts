import { Controller, Get, Param } from '@nestjs/common'
import User from 'src/modules/users/models/user'
import UsersService from 'src/modules/users/user-service'

@Controller()
export class AppController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    public showHome(): void {
        return
    }

    @Get('profile/:id')
    public async showProfile(@Param('id') id: string): Promise<User> {
        return this.usersService.getUser(id)
    }
}
