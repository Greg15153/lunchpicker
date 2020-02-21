interface Metadata {
    createdBy: string

    createdDate: Date

    modifiedBy: string

    modifiedDate: Date
}

class Entity {
    metadata?: Metadata

    public constructor(metadata?: Metadata) {
        this.metadata = metadata
    }
}

export default Entity
