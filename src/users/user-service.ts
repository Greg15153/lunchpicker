import User from './user'

interface UserService {
    getUser(id: string): Promise<User>
}

export default UserService