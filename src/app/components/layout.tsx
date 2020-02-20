import React, { FunctionComponent } from 'react'
import Header from './header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout: FunctionComponent = ({ children }) => (
    <div style={layoutStyle}>
        <Header />
        {children}
    </div>
)

export default Layout
