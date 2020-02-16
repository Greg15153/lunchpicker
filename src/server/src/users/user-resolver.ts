import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import User, { UserProperties } from './user'
import UserService from './postgres-user-service'
import Container from '../container'
import config from '../config'
import { NewUserError } from './errors'
import Result from '../util/result'

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
    async addUser(@Arg('data') addUserData: UserProperties): Promise<Result<User, NewUserError>> {
        // TODO: Authentication to not use systemAdminId
        const result = User.New(addUserData, config.system.adminId)

        if (result.isErr) {
            return result
        }

        await this._userService.addUser(result.value)

        return result
    }
}

export default UserResolver
