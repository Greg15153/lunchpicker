import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
class User {
    @Field(() => ID)
    id: string

    @Field()
    firstName: string

    @Field()
    lastName: string
}

export default User
