import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class LunchDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getInitialProps(ctx): Promise<any> {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(): React.ReactElement {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
                <style jsx global>
                    {`
                        *,
                        *:after,
                        *:before {
                            box-sizing: border-box;
                            padding: 0;
                            margin: 0;
                        }

                        html {
                            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                                Bitstream Vera Sans Mono, Courier New, monospace;
                            line-height: 1.5;
                        }
                    `}
                </style>
            </Html>
        )
    }
}

export default LunchDocument
