import { Mapper } from '@nartc/automapper'

import { _Error } from '@/Domain/Entity'
import { ErrorViewModel } from '@/Api/ViewModel'
import { ErrorServices } from '@/Domain/Services'

const errorServices = new ErrorServices()

export default class ErrorApp {
  static async getAll (): Promise<ErrorViewModel[]> {
    const errors = await errorServices.getAll()
    return Mapper.mapArray(errors, ErrorViewModel)
  }

  static async add (errorView: ErrorViewModel): Promise<void> {
    const error = Mapper.map(errorView, _Error)
    await errorServices.add(error)
  }
}
