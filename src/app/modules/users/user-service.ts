import UsersRepository, { UsersRepositoryTypeName } from './infrastructure/users-repository'
import User from './models/user'
import CreateUserDto from './dto/create-user'
import { NewUserError } from './errors'
import Result from 'util/result'
import { Inject } from '@nestjs/common'

class UsersService {
    private readonly adminId: string = ''

    public constructor(@Inject(UsersRepositoryTypeName) private readonly usersRepository: UsersRepository) {}

    async getUser(id: string): Promise<User> {
        return this.usersRepository.getUser(id)
    }

    async createUser(dto: CreateUserDto): Promise<Result<User, NewUserError>> {
        const result = User.New(dto, this.adminId)

        if (result.isErr) {
            return result
        }

        await this.usersRepository.addUser(result.value)

        return result
    }
}

export default UsersService
