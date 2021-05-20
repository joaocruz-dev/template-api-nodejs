import { Id, keys } from '@/Utils'
import Token from '@/Api/Functions/Auth/Token'
import ProfileServices from './ProfileServices'
import { HashToken, User } from '@/Domain/Entity'
import { UserRepository } from '@/Infra/Repository'
import BaseService from '@/Domain/Services/Extras/Base/BaseService'
import { Email, TInvitation, TInvitationData, TRecover, TRecoverData } from '@/Infra/Email'

export default class UserServices extends BaseService<User, UserRepository> {
  constructor (
    private profileService = new ProfileServices()
  ) { super(new UserRepository()) }

  async login (email: string, password: string): Promise<User> {
    const user = await this.repository.getEmail(email)
    if (!user) throw new Error('Email não encontrado')

    const profile = await this.profileService.getId(user.idProfile)
    if (!user) throw new Error('Perfil não encontrado')

    if (!user.status) throw new Error('Usuário desativado')
    if (!user.confirmed) throw new Error('Usuário não está confirmado')
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

  async addService (user: User, sendEmail = true): Promise<void> {
    const _user = await this.repository.getRegistered(user)
    if (_user) throw new Error('Usuário já está cadastrado')

    const hashConfirmed = new HashToken()
    hashConfirmed.generateHash(50)
    hashConfirmed.validity = null
    hashConfirmed.identification = 'confirmed'

    user.confirmed = false
    user.hashTokens = [hashConfirmed]
    user.messagingTokens = []

    if (sendEmail) {
      const tdata = new TInvitationData()
      tdata.setRegister(user, hashConfirmed.hash)

      const tinvitation = new TInvitation()
      tinvitation.documents = [{ to: user.email, data: tdata }]
      await Email.send(tinvitation)
    }

    await this.repository.add(user)
  }

  async addHashToken (idUser: Id, hashToken: HashToken): Promise<void> {
    const user = await this.repository.getId(idUser)
    if (!user) throw new Error('Usuário não encontrado!')

    user.hashTokens.push(hashToken)

    await this.repository.update(user)
  }

  async sendEmail (idUser: Id): Promise<void> {
    const user = await this.repository.getId(idUser)
    if (!user) throw new Error('Usuário não encontrado!')
    if (user.confirmed) throw new Error('Usuário já está confirmado!')

    const hashConfirmed = user.hashTokens.find(x => x.identification === 'confirmed')
    if (!hashConfirmed) throw new Error('Usuário com erro!')

    const tdata = new TInvitationData()
    tdata.setRegister(user, hashConfirmed.hash)

    const tinvitation = new TInvitation()
    tinvitation.documents = [{ to: user.email, data: tdata }]
    await Email.send(tinvitation)
  }

  async addMessagingToken (idUser: Id, token: string): Promise<void> {
    const user = await this.getId(idUser)
    if (!user) throw new Error('Usuário não encontrado!')

    const exist = user.messagingTokens?.find(x => x === token)
    if (exist) return

    if (!user.messagingTokens) user.messagingTokens = []
    user.messagingTokens.unshift(token)

    if (user.messagingTokens.length > 5) user.messagingTokens = user.messagingTokens.slice(0, 5)

    await this.repository.update(user)
  }

  async infoRegistrated (email: string, hash: string): Promise<User | any> {
    const user = await this.repository.getEmail(email)
    if (!user) throw new Error('Usuário não encontrado!')
    if (user.confirmed) return { confirmed: true }

    const hashToken = user.hashTokens.find(x => x.hash === hash)
    if (!hashToken || !hashToken.verify('confirmed', hash)) throw new Error('Token inválido')

    return user
  }

  async registrated (user: User, hash: string): Promise<void> {
    const _user = await this.repository.getEmail(user.email)
    if (!_user) throw new Error('Usuário não encontrado!')
    if (_user.confirmed) throw new Error('Usuário já está confirmado!')

    const hashToken = _user.hashTokens.find(x => x.hash === hash)
    if (!hashToken || !hashToken.verify('confirmed', hash)) throw new Error('Token inválido')

    _user.name = user.name
    _user.cpf = user.cpf
    _user.phone = user.phone
    _user.password = user.password || _user.password
    _user.confirmed = true
    _user.hashTokens = []

    if (!_user.password) throw new Error('Nenhuma senha registrada')

    await this.repository.update(_user)
  }

  async recover (email: string): Promise<void> {
    email = email.toLowerCase().trim()

    const user = await this.repository.getEmail(email)
    if (!user) throw new Error('Usuário não encontrado!')
    if (!user.confirmed) throw new Error('Usuário não confirmado!')

    const hashPassword = new HashToken()
    hashPassword.generateHash(50)
    hashPassword.validity = new Date(new Date().getTime() + 300000).toISOString() // 5min
    hashPassword.identification = 'password'

    user.hashTokens = user.hashTokens.filter(x => x.identification !== 'password')
    user.hashTokens.push(hashPassword)

    const trecover = new TRecover()
    trecover.documents = [{ to: user.email, data: new TRecoverData(user, hashPassword.hash) }]
    await Email.send(trecover)

    const recover = new User()
    recover._id = user._id
    recover.hashTokens = user.hashTokens

    await this.repository.update(recover)
  }

  async updatePassword (user: User, hash: string): Promise<void> {
    const hashToken = !user._id

    let _user: User
    if (hashToken) _user = await this.repository.getEmail(user.email)
    else _user = await this.getId(user._id)

    if (!_user) throw new Error('Usuário não encontrado!')

    if (hashToken) {
      const hashToken = _user.hashTokens.find(x => x.hash === hash)
      if (!hashToken.verify('password', hash)) throw new Error('Token inválido ou expirado!')
    } else {
      const confirm = Token.comparePass(_user.password, hash)
      if (!confirm) throw new Error('Senha incorreta!')
    }

    _user.password = user.password
    _user.hashTokens = _user.hashTokens.filter(x => x.identification !== 'password')

    await this.repository.update(_user)
  }

  async update (user: User): Promise<void> {
    delete user.email
    delete user.confirmed
    delete user.hashTokens
    delete user.messagingTokens

    for (const key of keys(user)) {
      if (user[key] === null) delete user[key]
    }

    await this.repository.update(user)
  }

  async delete (user: User): Promise<void> {
    const defaultUsers = ['605460b14e3b5704c84883d1']
    if (defaultUsers.includes(user._id.toHexString())) throw new Error('Este Usuário não pode ser excluído')

    await this.repository.delete(user)
  }
}
