import { Controller, Get } from '@nestjs/common'
import User from './user'

const users: User[] = [
    {
        id: '123-123-123',
        firstName: 'Greg',
        lastName: 'Ellis'
    }
]

@Controller('users')
class UsersController {
    @Get()
    async getUsers(): Promise<User[]> {
        return users
    }
}

export default UsersController
