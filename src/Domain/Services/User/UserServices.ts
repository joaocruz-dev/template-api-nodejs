import { ObjectId } from 'mongodb'

import { UserRepository, UserGroupRepository } from '@/Infra/Repository'
import { User, UserGroup } from '@/Domain/Entity'
import { Id, keys } from '@/Utils'
import Token from '@/Api/Auth/Token'

const userRepository = new UserRepository()
const groupRepository = new UserGroupRepository()

interface LoginService {
  id: ObjectId
}

export default class UserServices {
  static async login (email: string, password: string): Promise<LoginService> {
    let user: User
    try {
      user = await userRepository.getEmail(email)
    } catch (e) {
      throw new Error('Email não encontrado')
    }
    let group: UserGroup
    try {
      group = await groupRepository.getId(user.usergroup)
    } catch (e) {
      throw new Error('Grupo de Usuário não encontrado')
    }
    if (!group.status) throw new Error('Grupo de Usuários desativado')
    if (!user.confirmed) throw new Error('Confirme seu email')
    if (!user.status) throw new Error('Usuário desativado')
    const confirm = Token.comparePass(user.password, password)
    if (!confirm) throw new Error('Senha incorreta')
    return { id: user._id }
  }

  static async getId (id: Id): Promise<User> {
    return await userRepository.getId(id)
  }

  static async getAll (): Promise<User[]> {
    return await userRepository.getAll()
  }

  static async add (user: User): Promise<void> {
    user.confirmed = true
    try {
      await userRepository.getEmail(user.email)
    } catch (error) {
      await userRepository.add(user)
      return
    }
    throw new Error('Usuário já está cadastrado')
  }

  static async update (user: User): Promise<void> {
    delete user.email
    delete user.confirmed
    for (const key of keys(user)) {
      if (user[key] === null) delete user[key]
    }
    await userRepository.update(user)
  }

  static async updatePassword (password: string, user: User): Promise<void> {
    const _user = await UserServices.getId(user._id)
    const confirm = Token.comparePass(_user.password, password)
    if (!confirm) throw new Error('Senha incorreta')
    await UserServices.update(user)
  }

  static async delete (user: User): Promise<void> {
    await userRepository.delete(user._id)
  }
}
