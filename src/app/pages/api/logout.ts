import { NextApiRequest, NextApiResponse } from 'next'

import auth0 from '../../util/auth0'

export default async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await auth0.handleLogout(req, res)
    } catch (error) {
        console.log(error)
        res.status(error.status || 400).end(error.message)
    }
}
