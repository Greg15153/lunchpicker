import 'reflect-metadata'
import User from '../src/users/user'
import { v4 as uuid } from 'uuid'
import { RequiredStringError } from '../src/util/errors'

describe('New', () => {
    describe('Valid', () => {
        test('Success', () => {
            const createdBy = uuid()
            const userProperties = {
                firstName: 'Greg',
                lastName: 'Ellis'
            }

            const result = User.New(userProperties, createdBy)

            expect(result.isOk).toBeTruthy()
            expect(result.value.id).toBeDefined()
            expect(result.value.firstName).toEqual(userProperties.firstName)
            expect(result.value.lastName).toEqual(userProperties.lastName)
            expect(result.value.metadata.createdBy).toEqual(createdBy)
        })
    })

    describe('Invalid', () => {
        test('Empty firstname', () => {
            const userProperties = {
                firstName: '',
                lastName: 'Ellis'
            }

            const result = User.New(userProperties, uuid())

            expect(result.isOk).toBeFalsy()
            expect(result.error).toHaveLength(1)
            expect(result.error[0]).toBeInstanceOf(RequiredStringError)
        })

        test('Empty lastName', () => {
            const userProperties = {
                firstName: 'Greg',
                lastName: ''
            }

            const result = User.New(userProperties, uuid())

            expect(result.isOk).toBeFalsy()
            expect(result.error).toHaveLength(1)
            expect(result.error[0]).toBeInstanceOf(RequiredStringError)
        })

        test('Handles multiple validation errors', () => {
            const userProperties = {
                firstName: '',
                lastName: ''
            }

            const result = User.New(userProperties, uuid())

            expect(result.isOk).toBeFalsy()
            expect(result.error).toHaveLength(2)
        })
    })
})
