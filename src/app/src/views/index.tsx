import React, { FunctionComponent } from 'react'
import { SearchBox, List } from 'office-ui-fabric-react'
import Layout from './layout'

interface Business {
    id: number
    name: string
}

const items: Business[] = [
    {
        id: 1,
        name: 'Burger King'
    },
    {
        id: 2,
        name: 'McDonalds'
    }
]

const Index: FunctionComponent = (): JSX.Element => (
    <Layout>
        <SearchBox placeholder="Location" />
        <List items={items} />
    </Layout>
)
export default Index
