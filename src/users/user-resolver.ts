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

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: string): Promise<User> {
        return this._userService.getUser(id)
    }
}

export default UserResolver
