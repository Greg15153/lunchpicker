import React, { FunctionComponent } from 'react'
import Link from 'next/link'

const Navigation: FunctionComponent = () => (
    <ul>
        <li>
            <Link href="">Home</Link>
        </li>
        <li>
            <Link href="about">About Us</Link>
        </li>
    </ul>
)

export default Navigation
