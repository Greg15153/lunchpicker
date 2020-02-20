import { RequiredStringError } from '../util/errors'

export type FirstNameRequiredError = RequiredStringError
export type LastNameRequiredError = RequiredStringError

export type ValidationError = FirstNameRequiredError | LastNameRequiredError

export type NewUserError = ValidationError[]
