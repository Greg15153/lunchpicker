import { NextApiRequest, NextApiResponse } from 'next'

import auth0 from 'util/auth0'

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await auth0.handleLogin(req, res, undefined)
    } catch (error) {
        console.log(error)
        res.status(error.status || 400).end(error.message)
    }
}
