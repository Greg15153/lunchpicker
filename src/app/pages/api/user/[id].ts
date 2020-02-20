import { NextApiRequest, NextApiResponse } from 'next'
import UserService from '../../../server/users/user-service'
import container, { TYPES } from '../../../server/container'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // TODO: Figure out a good way to inject properly
    // https://github.com/inversify/InversifyJS/blob/master/wiki/recipes.md
    const userService = container.get<UserService>(TYPES.UserService)

    // TODO: Write some kind of wrapper to make this prettier
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET': {
            if (!id) {
                res.status(400)
                return
            }

            const user = await userService.getUser(id as string)
            res.status(200).json(user)
            return
        }
        default:
            res.status(405)
            return
    }

    res.status(400)
}
