import React, { FunctionComponent } from 'react'
import User from 'modules/users/models/user'
import Layout from './layout'

const Index: FunctionComponent<User> = ({ id, firstName, lastName }): JSX.Element => (
    <Layout>
        <div>
            <h1>{`${id}: ${firstName} ${lastName}`}</h1>
        </div>
    </Layout>
)
export default Index
