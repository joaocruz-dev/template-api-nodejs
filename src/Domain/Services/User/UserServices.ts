import { ObjectId } from 'mongodb'

import { keys } from '@/Utils'
import { User } from '@/Domain/Entity'
import BaseService from '../Base/BaseService'
import Token from '@/Api/Functions/Auth/Token'
import { UserRepository } from '@/Infra/Repository'
import ProfileServices from '../Profile/ProfileServices'

export default class UserServices extends BaseService<User, UserRepository> {
  constructor (private profileService = new ProfileServices()) { super(new UserRepository()) }

  async login (email: string, password: string): Promise<User> {
    const user = await this.repository.getEmail(email.toLowerCase().trim())
    if (!user) throw new Error('Email não encontrado')

    const profile = await this.profileService.getId(user.idProfile)
    if (!user) throw new Error('Perfil não encontrado')

    if (!user.status) throw new Error('Usuário desativado')
    if (!profile.status) throw new Error('Perfil desativado')

    const confirm = Token.comparePass(user.password, password)
    if (!confirm) throw new Error('Senha incorreta')

    return user
  }

  async getEmail (email: string): Promise<User> {
    return await this.repository.getEmail(email)
  }

  async getCPF (cpf: string): Promise<User> {
    return await this.repository.getCPF(cpf)
  }

  async getPhone (phone: string): Promise<User> {
    return await this.repository.getPhone(phone)
  }

  async add (user: User): Promise<void> {
    user.email = user.email.toLowerCase().trim()

    const _user = await this.repository.getRegistered(user)
    if (_user) throw new Error('Usuário já está cadastrado')

    user.confirmed = false
    user.hashConfirmed = Token.randomString(50)

    // Send E-mail

    await this.repository.add(user)
  }

  async register (origin: string, user: User): Promise<void> {
    user.email = user.email.toLowerCase().trim()

    const _user = await this.repository.getRegistered(user)
    if (_user) throw new Error('Usuário já está cadastrado')

    user.idProfile = new ObjectId('5e5be02f1a43784474b14231')
    user.status = true
    user.confirmed = false
    user.hashConfirmed = Token.randomString(50)

    // Send E-mail

    await this.repository.add(user)
  }

  async confirmed (email: string, hash: string): Promise<void> {
    email = email.toLowerCase().trim()

    const user = await this.repository.getEmail(email)
    if (!user) throw new Error('Email não encontrado')

    if (user.hashConfirmed !== hash) throw new Error('Token inválido')

    const confirmed = new User()
    confirmed._id = user._id
    confirmed.confirmed = true
    confirmed.hashConfirmed = null

    await this.repository.update(confirmed)
  }

  async recover (origin: string, email: string): Promise<void> {
    email = email.toLowerCase().trim()

    const user = await this.repository.getEmail(email)
    if (!user) throw new Error('Email não encontrado')

    user.hashPassword = Token.randomString(50)

    // Send E-mail

    const recover = new User()
    recover._id = user._id
    recover.hashPassword = user.hashPassword

    await this.repository.update(recover)
  }

  async recoverPassword (user: User, hash: string): Promise<void> {
    user.email = user.email.toLowerCase().trim()

    const _user = await this.repository.getEmail(user.email)
    if (!_user) throw new Error('Email não encontrado')

    if (_user.hashPassword !== hash) throw new Error('Token inválido')

    const newPassword = new User()
    newPassword._id = _user._id
    newPassword.password = user.password
    newPassword.hashPassword = null

    await this.repository.update(newPassword)
  }

  async update (user: User): Promise<void> {
    delete user.email
    delete user.confirmed
    delete user.hashPassword
    delete user.hashConfirmed

    for (const key of keys(user)) {
      if (user[key] === null) delete user[key]
    }

    await this.repository.update(user)
  }

  async updatePassword (password: string, user: User): Promise<void> {
    const _user = await this.getId(user._id)

    const confirm = Token.comparePass(_user.password, password)
    if (!confirm) throw new Error('Senha incorreta')

    await this.update(user)
  }
}
