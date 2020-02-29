import { Document, Head, Main } from '@react-ssr/nestjs-express'
import React from 'react'

export default class extends Document {
    render(): JSX.Element {
        return (
            <html lang="en">
                <Head>
                    <title>LunchPicker</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="index.css" />
                </Head>
                <body>
                    <Main />
                </body>
            </html>
        )
    }
}
