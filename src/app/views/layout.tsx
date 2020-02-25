import React, { FunctionComponent } from 'react'
const Layout: FunctionComponent = ({ children }): JSX.Element => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}

export default Layout
