import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { v4 as uuid } from 'uuid'
import Entity from '../util/entity'
import Result, { Ok, Err } from '../util/result'
import { NewUserError, ValidationError as UserValidationError } from './errors'
import { isRequiredString } from '../util/validators'

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
    static New(properties: UserProperties, createdBy: string): Result<User, NewUserError> {
        const errs: UserValidationError[] = []

        type validator<T> = (name: string, property: T) => Result<T, unknown>

        const validate = <T>(name: string, property: T, validator: validator<T>): void => {
            const result = validator(name, property)

            if (result.isErr) {
                errs.push(result.error as UserValidationError)
            }
        }

        validate('firstName', properties.firstName, isRequiredString)
        validate('lastName', properties.lastName, isRequiredString)

        if (errs.length > 0) {
            return new Err(errs)
        }

        const createdDate = new Date()

        const user = {
            id: uuid(),
            ...properties,
            metadata: {
                createdBy,
                createdDate,
                modifiedBy: createdBy,
                modifiedDate: createdDate
            }
        }

        return new Ok(user)
    }

    @Field(() => ID)
    readonly id: string

    @Field()
    readonly firstName: string

    @Field()
    readonly lastName: string
}

export default User
