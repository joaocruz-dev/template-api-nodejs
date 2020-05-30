import { plainToClass } from 'class-transformer'

import BaseRepository from '../Base/BaseRepository'
import { User } from '@/Domain/Entity'
import { resultMongo } from '@/Utils'

export default class UserRepository extends BaseRepository<User> {
  constructor () { super('users', User) }

  async getEmail (email: string): Promise<User> {
    const filter = { email }
    let user = await this.db.users.findOne(filter)
    if (!user) resultMongo(false)
    user = plainToClass(User, user)
    return user
  }
}
