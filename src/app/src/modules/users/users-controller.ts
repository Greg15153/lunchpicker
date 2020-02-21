import { Controller, Get, Param } from '@nestjs/common'
import User from './models/user'
import UsersService from './user-service'

@Controller('users')
class UsersController {
    private readonly usersService: UsersService

    public constructor(usersService: UsersService) {
        this.usersService = usersService
    }

    @Get(':id')
    async getUsers(@Param('id') id: string): Promise<User> {
        return this.usersService.getUser(id)
    }
}

export default UsersController
