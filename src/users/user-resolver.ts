import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import User, { UserProperties } from './user'
import UserService from './postgres-user-service'
import Container from '../container'
import config from '../config'

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

    @Mutation(() => User)
    async addUser(@Arg('data') addUserData: UserProperties): Promise<User> {
        // TODO: Authentication to not use systemAdminId
        const user = User.New(addUserData, config.system.adminId)

        await this._userService.addUser(user)

        return user
    }
}

export default UserResolver
