import { _Error } from '@/Domain/Entity'
import BaseService from '../Base/BaseService'
import Server from '@/Api/Functions/Server/Server'
import { ErrorRepository } from '@/Infra/Repository'
import { Email, TError, TErrorData } from '@/Infra/Email'
import { ChangeHistory } from '@/Infra/Repository/Extras/Base/BaseRepository'

const server = new Server()

export default class ErrorServices extends BaseService<_Error, ErrorRepository> {
  constructor () { super(new ErrorRepository()) }

  async add (data: _Error, changeHistory?: ChangeHistory): Promise<void> {
    try {
      const terror = new TError()
      terror.documents = [
        { to: 'jcruzaraujoneto@outlook.com', data: new TErrorData() },
        { to: 'jcruzaraujoneto@earthtechnollogy.com', data: new TErrorData() }
      ]

      if (server.isProduction) await Email.send(terror)
    } catch (error) {
      console.log('Error')
    }

    await this.repository.add(data, changeHistory)
  }
}
