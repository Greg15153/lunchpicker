import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Metadata {
    @Field({ nullable: true })
    createdBy: string

    @Field({ nullable: true })
    createdDate: Date

    @Field({ nullable: true })
    modifiedBy: string

    @Field({ nullable: true })
    modifiedDate: Date
}

@ObjectType()
class Entity {
    @Field({ nullable: true })
    metadata: Metadata
}

export default Entity
