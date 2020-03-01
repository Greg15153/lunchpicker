import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import User from './models/user'
import UsersService from './user-service'

@Controller('users')
class UsersController {
    private readonly usersService: UsersService

    public constructor(usersService: UsersService) {
        this.usersService = usersService
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMe(): Promise<User> {
        return {
            id: 'Greg',
            firstName: 'Greg',
            lastName: 'Ellis'
        }
    }

    // API
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.usersService.getUser(id)
    }
}

export default UsersController
