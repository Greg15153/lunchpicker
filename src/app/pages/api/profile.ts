import auth0 from 'util/auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function profile(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await auth0.handleProfile(req, res, undefined)
    } catch (error) {
        console.log(error)
        res.status(error.status || 400).end(error.message)
    }
}
