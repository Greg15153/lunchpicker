import { GraphQLSchema } from 'graphql'
import { buildSchema, MiddlewareFn } from 'type-graphql'
import * as path from 'path'

// Resolvers
import UserResolver from './users/user-resolver'
import Result from './util/result'

const resultInterceptor: MiddlewareFn = async (_, next) => {
    const resolverResult = await next()

    const result = resolverResult as Result<unknown, unknown>

    if (result) {
        if (result.isErr) {
            throw new Error(result.error[0]?.message)
        }

        return result.value
    }

    return resolverResult
}

async function generateSchema(): Promise<GraphQLSchema> {
    return buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        globalMiddlewares: [resultInterceptor]
    })
}

export default generateSchema
