import { User } from '@/Domain/Entity'
import { Template, Document, Data } from '../Models'
import ServerData from '@/Api/Functions/Server/Server'

const server = new ServerData()

export class TRecover extends Template <TRecoverData, Document<TRecoverData>> {
  constructor () { super('template-key', []) }
}

export class TRecoverData extends Data {
  private userName: string
  private hrefButton: string

  constructor (user: User, hash: string) {
    super()

    hash = encodeURIComponent(hash)
    const email = encodeURIComponent(user.email)

    this.userName = user.name
    this.hrefButton = `${server.view}/auth/recover?type=new-password&email=${email}&hash=${hash}`
  }

  async getValue (): Promise<object> {
    return {
      userName: this.userName,
      hrefButton: this.hrefButton
    }
  }
}
