import { NextApiRequest, NextApiResponse } from 'next'

export interface Quote {
    author: string
    text: string
}

const quotes: Quote[] = [
    {
        text: 'Write tests, not too many, mostly integration',
        author: 'Guillermo Rauch'
    },
    {
        text: 'Talk is cheap. Show me the code.',
        author: 'Linus Torvalds'
    },
    {
        text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
        author: 'Harold Abelson'
    }
]

export default (req: NextApiRequest, res: NextApiResponse<Quote>): void => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    res.status(200).json(quote)
}
