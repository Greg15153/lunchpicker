import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import * as path from 'path'

// Resolvers
import UserResolver from './users/user-resolver'

async function generateSchema(): Promise<GraphQLSchema> {
    return buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })
}

export default generateSchema