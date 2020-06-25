import { plainToClass } from 'class-transformer'

import { resultMongo } from '@/Utils'
import { User } from '@/Domain/Entity'
import BaseRepository from '../Base/BaseRepository'

export default class UserRepository extends BaseRepository<User> {
  constructor () { super('users', User) }

  async getEmail (email: string): Promise<User> {
    const filter = { email }
    let user = await this.db.users.findOne(filter)
    if (!user) resultMongo(false)
    user = plainToClass(User, user)
    return user
  }

  async getRegistered (email: string, cpf: string): Promise<User> {
    const filter = {
      $or: [{ email }, { cpf }]
    }
    let user = await this.db.users.findOne(filter)
    if (!user) resultMongo(false)
    user = plainToClass(User, user)
    return user
  }

  async getCPF (cpf: string): Promise<User> {
    const filter = { cpf }
    let user = await this.db.users.findOne(filter)
    if (!user) resultMongo(false)
    user = plainToClass(User, user)
    return user
  }
}
