import { plainToClass } from 'class-transformer'

import { User } from '@/Domain/Entity'
import { BaseRepository } from '@/Infra/Repository/Extras/Base/BaseRepository'

interface Registered {
  cpf?: string
  email?: string
  // phone?: string
}

export default class UserRepository extends BaseRepository<User> {
  constructor () { super(User, 'users') }

  async getEmail (email: string): Promise<User> {
    const filter = { email: email.toLowerCase().trim() }
    const user = await this.collection.findOne(filter)
    return user ? plainToClass(User, user) : null
  }

  async getCPF (cpf: string): Promise<User> {
    const filter = { cpf }
    const user = await this.collection.findOne(filter)
    return user ? plainToClass(User, user) : null
  }

  async getPhone (phone: string): Promise<User> {
    const filter = { phone }
    const user = await this.collection.findOne(filter)
    return user ? plainToClass(User, user) : null
  }

  async getRegistered (registered: Registered): Promise<User> {
    const $or: any[] = []
    const { cpf, email } = registered

    if (cpf) $or.push({ cpf })
    if (email) $or.push({ email: email.toLowerCase().trim() })
    // if (phone) $or.push({ phone })

    const filter = { $or }
    const user = await this.collection.findOne(filter)
    return user ? plainToClass(User, user) : null
  }
}
