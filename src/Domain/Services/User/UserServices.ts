import { ObjectId } from 'mongodb'

import { Id, keys } from '@/Utils'
import Token from '@/Api/Auth/Token'
import { User, Profile } from '@/Domain/Entity'
import { UserRepository } from '@/Infra/Repository'

import ProfileServices from '../Profile/ProfileServices'

const userRepository = new UserRepository()

export default class UserServices {
  static async login (email: string, password: string): Promise<User> {
    let user: User
    try {
      user = await userRepository.getEmail(email)
    } catch (e) {
      throw new Error('Email não encontrado')
    }
    let profile: Profile
    try {
      profile = await ProfileServices.getId(user.idProfile)
    } catch (e) {
      throw new Error('Perfil não encontrado')
    }
    if (!profile.status) throw new Error('Perfil desativado')
    if (!user.status) throw new Error('Usuário desativado')
    if (!user.confirmed) throw new Error('Confirme seu email')
    const confirm = Token.comparePass(user.password, password)
    if (!confirm) throw new Error('Senha incorreta')
    return user
  }

  static async getId (id: Id): Promise<User> {
    return await userRepository.getId(id)
  }

  static async getEmail (email: string): Promise<User> {
    return await userRepository.getEmail(email)
  }

  static async getCPF (cpf: string): Promise<User> {
    return await userRepository.getCPF(cpf)
  }

  static async getAll (): Promise<User[]> {
    return await userRepository.getAll()
  }

  static async add (origin: string, user: User): Promise<void> {
    try {
      await userRepository.getRegistered(user.email, user.cpf)
    } catch (error) {
      user.confirmed = false
      user.hashConfirmed = Token.randomString(50)

      // const template = new Template()
      // template.register(origin, user)
      // await Email.send(user.email, 'Cadastro', template)

      await userRepository.add(user)
      return
    }
    throw new Error('Usuário já está cadastrado')
  }

  static async register (origin: string, user: User): Promise<void> {
    try {
      await userRepository.getRegistered(user.email, user.cpf)
    } catch (error) {
      user.idProfile = new ObjectId('5e5be02f1a43784474b14231')
      user.status = true
      user.confirmed = false
      user.hashConfirmed = Token.randomString(50)

      // const template = new Template()
      // template.register(origin, user)
      // await Email.send(user.email, 'Cadastro', template)

      await userRepository.add(user)
      return
    }
    throw new Error('Usuário já está cadastrado')
  }

  static async confirmed (email: string, hash: string): Promise<void> {
    let user: User
    try {
      user = await userRepository.getEmail(email)
    } catch (error) {
      throw new Error('Email não encontrado')
    }
    if (user.hashConfirmed !== hash) throw new Error('Token inválido')
    const confirmed = new User()
    confirmed._id = user._id
    confirmed.confirmed = true
    confirmed.hashConfirmed = null
    await userRepository.update(confirmed)
  }

  static async recover (origin: string, email: string): Promise<void> {
    let user: User
    try {
      user = await userRepository.getEmail(email)
    } catch (error) {
      throw new Error('Email não encontrado')
    }
    user.hashPassword = Token.randomString(50)

    // const template = new Template()
    // template.recover(origin, user)
    // await Email.send(user.email, 'Recuperar Senha', template)

    const recover = new User()
    recover._id = user._id
    recover.hashPassword = user.hashPassword
    await userRepository.update(recover)
  }

  static async recoverPassword (user: User, hash: string): Promise<void> {
    let _user: User
    try {
      _user = await userRepository.getEmail(user.email)
    } catch (error) {
      throw new Error('Email não encontrado')
    }
    if (_user.hashPassword !== hash) throw new Error('Token inválido')
    const newPassword = new User()
    newPassword._id = _user._id
    newPassword.password = user.password
    newPassword.hashPassword = null
    await userRepository.update(newPassword)
  }

  static async update (user: User): Promise<void> {
    delete user.email
    delete user.hashPassword
    delete user.confirmed
    delete user.hashConfirmed
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
