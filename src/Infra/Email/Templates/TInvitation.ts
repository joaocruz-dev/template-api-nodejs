import { User } from '@/Domain/Entity'
import { Template, Document, Data } from '../Models'
import ServerData from '@/Api/Functions/Server/Server'

const server = new ServerData()

export class TInvitation extends Template <TInvitationData, Document<TInvitationData>> {
  constructor () { super('template-key', []) }
}

export class TInvitationData extends Data {
  private message: string
  private hrefButton: string

  constructor (message?: string, hrefButton?: string) {
    super()

    this.message = message || null
    this.hrefButton = hrefButton || null
  }

  setRegister (user: User, hash: string): void {
    this.message = `
      Olá ${user.name}, você acabou de receber um convite para juntar-se ao project_name!
      Agora basta clicar no botão abaixo e seguir as instruções.
    `

    hash = encodeURIComponent(hash)
    const email = encodeURIComponent(user.email)
    this.hrefButton = `${server.view}/auth/invitation?email=${email}&hash=${hash}`
  }

  async getValue (): Promise<object> {
    return {
      message: this.message,
      hrefButton: this.hrefButton
    }
  }
}
