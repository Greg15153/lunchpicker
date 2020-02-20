import React from 'react'
import NextApp, { Container } from 'next/app'
import Head from 'next/head'

class App extends NextApp {
    public render(): JSX.Element {
        const { Component, pageProps } = this.props

        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Lunchpicker</title>
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}

export default App
