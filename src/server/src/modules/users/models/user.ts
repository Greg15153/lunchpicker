import Entity from 'src/util/entity'
import Result, { Err, Ok } from 'src/util/result'
import { isRequiredString } from 'src/util/validators'
import { v4 as uuid } from 'uuid'

import CreateUserDto from '../dto/create-user'
import { NewUserError, ValidationError as UserValidationError } from '../errors'

class User extends Entity {
    private constructor() {
        super()
    }

    // TODO: Make this immutable through New method / database only
    static New(dto: CreateUserDto, createdBy: string): Result<User, NewUserError> {
        const errs: UserValidationError[] = []

        type validator = (name: string, property: string) => Result<unknown, unknown>

        const validate = (name: string, property: string, validator: validator): void => {
            const result = validator(name, property)

            if (result.isErr) {
                errs.push(result.error as UserValidationError)
            }
        }

        validate('firstName', dto.firstName, isRequiredString)
        validate('lastName', dto.lastName, isRequiredString)

        if (errs.length > 0) {
            return new Err(errs)
        }

        const createdDate = new Date()

        const user = {
            id: uuid(),
            ...dto,
            metadata: {
                createdBy,
                createdDate,
                modifiedBy: createdBy,
                modifiedDate: createdDate
            }
        }

        return new Ok(user)
    }

    readonly id: string

    readonly firstName: string

    readonly lastName: string
}

export default User
