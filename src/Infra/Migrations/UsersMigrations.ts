import { ObjectId } from 'mongodb'

import { Address, User } from '@/Domain/Entity'
import { UserServices } from '@/Domain/Services'

export default class UsersMigrations {
  constructor (
    private userServices = new UserServices()
  ) {}

  async set () {
    const count = await this.userServices.getSize()
    if (count) return

    await this.userServices.add(this.supervisor)
  }

  private get supervisor () {
    const address = new Address()
    address.cep = '78555-399'
    address.street = 'Rua Turim'
    address.number = 731
    address.district = 'Residencial Florença'
    address.complement = 'Casa 01'
    address.state = 'MT'
    address.city = 'Sinop'
    address.coordinate = null

    const user = new User()
    user._id = new ObjectId('605460b14e3b5704c84883d1')
    user.name = 'Administrador'
    user.cpf = '420.258.328-00'
    user.email = 'jcruzaraujoneto@earthtechnollogy.com'
    user.phone = '(66) 98156-3280'
    user.password = '$2a$10$H6FakaI7g3fiy/AjFrsR7eOO9oPUyMHKaNmp7hoRgpRyydGMENoiW' // 12345678
    user.avatar = 'https://avatars2.githubusercontent.com/u/40739602'
    user.address = address
    user.status = true
    user.confirmed = true
    user.idProfile = new ObjectId('5e5be02f1a43784474b14230')
    user.hashTokens = []
    user.messagingTokens = []

    return user
  }
}
