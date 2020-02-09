import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { v4 as uuid } from 'uuid'
import Entity from '../util/entity'

@InputType({ description: 'New user data' })
export class UserProperties {
    @Field()
    firstName: string

    @Field()
    lastName: string
}

@ObjectType()
class User extends Entity {
    // TODO: Make this immutable through New method / database only
    // TODO: Create Domain exceptions
    static New(properties: UserProperties, createdBy: string): User {
        if (!properties.firstName) {
            throw new Error('First name required')
        }

        if (!properties.lastName) {
            throw new Error('Last name required')
        }

        const createdDate = new Date()

        return {
            id: uuid(),
            ...properties,
            metadata: {
                createdBy,
                createdDate,
                modifiedBy: createdBy,
                modifiedDate: createdDate
            }
        }
    }

    @Field(() => ID)
    readonly id: string

    @Field()
    readonly firstName: string

    @Field()
    readonly lastName: string
}

export default User
