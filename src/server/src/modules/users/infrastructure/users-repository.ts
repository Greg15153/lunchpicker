import User from '../models/user'

interface UsersRepository {
    getUser(id: string): Promise<User | undefined>
    addUser(user: User): Promise<void>
}

export const UsersRepositoryTypeName = 'UsersRepository'

export default UsersRepository
