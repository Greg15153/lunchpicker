import User from './user'

interface UserService {
    getUser(id: string): Promise<User>
    addUser(user: User): Promise<void>
}

export default UserService
