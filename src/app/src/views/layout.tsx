import React, { FunctionComponent } from 'react'

const Layout: FunctionComponent = ({ children }): JSX.Element => (
    <>
        <ul>
            <li>
                <a href="/">Home</a>
                <a href="/profile/090b3e9a-7a7f-4da0-b0b5-6d4707178791">My Profile</a>
            </li>
        </ul>
        <div>{children}</div>
    </>
)

export default Layout
