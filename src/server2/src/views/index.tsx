import React, { FunctionComponent } from 'react'
import Layout from './layout'

interface Props {
    name: string
}

const Index: FunctionComponent<Props> = ({ name }): JSX.Element => (
    <Layout>
        <p>{`Hello ${name}`}</p>
    </Layout>
)
export default Index
