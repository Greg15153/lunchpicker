import React from 'react'
import { Document, Head, Main } from '@react-ssr/nestjs-express'

const style = {
    padding: 0,
    margin: 0
}
export default class extends Document {
    render(): JSX.Element {
        return (
            <html lang="en">
                <Head>
                    <title>LunchPicker</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body style={style}>
                    <Main />
                </body>
            </html>
        )
    }
}
