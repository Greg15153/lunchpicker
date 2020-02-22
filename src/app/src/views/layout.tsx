import React, { FunctionComponent } from 'react'
import { initializeIcons, setIconOptions } from 'office-ui-fabric-react'
const iconOptions = {
    disableWarnings: true
}
setIconOptions(iconOptions)
initializeIcons(undefined, iconOptions)

const Layout: FunctionComponent = ({ children }): JSX.Element => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}

export default Layout
