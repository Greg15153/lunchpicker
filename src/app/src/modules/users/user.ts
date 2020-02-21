import { v4 as uuid } from 'uuid'
import Entity from '../../util/entity'
import Result, { Ok, Err } from '../../util/result'
import { NewUserError, ValidationError as UserValidationError } from './errors'
import { isRequiredString } from '../../util/validators'

export interface UserProperties {
    firstName: string

    lastName: string
}

class User extends Entity {
    // TODO: Make this immutable through New method / database only
    static New(properties: UserProperties, createdBy: string): Result<User, NewUserError> {
        const errs: UserValidationError[] = []

        type validator = (name: string, property: string) => Result<unknown, unknown>

        const validate = (name: string, property: string, validator: validator): void => {
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

    readonly id!: string

    readonly firstName!: string

    readonly lastName!: string
}

export default User
