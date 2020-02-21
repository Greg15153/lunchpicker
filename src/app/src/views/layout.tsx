import React, { FunctionComponent } from 'react'

const Layout: FunctionComponent = ({ children }): JSX.Element => (
    <>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
        </ul>
        <div>{children}</div>
    </>
)

export default Layout
