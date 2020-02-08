import { Resolver, Query, Arg } from 'type-graphql'
import User from './user'
import UserService from './postgres-user-service'
import Container from '../container'

@Resolver(User)
class UserResolver {
    private _userService: UserService

    constructor() {
        this._userService = Container.resolve(UserService)
    }

    @Query(() => User)
    async user(@Arg('id') id: string): Promise<User> {

        await this._userService.getUser(id)

        return { id, firstName: 'Greg', lastName: 'Ellis' }
    }
}

export default UserResolver