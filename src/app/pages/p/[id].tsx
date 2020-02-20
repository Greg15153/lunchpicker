import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import useSWR from 'swr'
import { Quote } from '../api/quote'

function fetcher(url: string): Promise<Quote> {
    return fetch(url).then(r => r.json())
}

const Page: FunctionComponent = () => {
    const { data, error } = useSWR('/api/quote', fetcher)
    const router = useRouter()

    const author = data?.author
    let quote = data?.text

    if (!data) {
        quote = 'Loading...'
    }

    if (error) {
        quote = 'Failed to fetch the quote.'
    }

    return (
        <Layout>
            <h1>{router.query.id}</h1>
            <p>This is the blog post content.</p>
            <div className="quote">{quote}</div>
            {author && <span className="author">- {author}</span>}

            <style jsx>{`
                main {
                    width: 90%;
                    max-width: 900px;
                    margin: 300px auto;
                    text-align: center;
                }
                .quote {
                    font-family: cursive;
                    color: #e243de;
                    font-size: 24px;
                    padding-bottom: 10px;
                }
                .author {
                    font-family: sans-serif;
                    color: #559834;
                    font-size: 20px;
                }
            `}</style>
        </Layout>
    )
}

export default Page
