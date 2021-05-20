import { Mapper } from '@nartc/automapper'
import { HttpException } from '@nestjs/common'

import { ErrorApp } from '@/Application/Services'
import { ErrorViewModel, UserInfoViewModel, UserViewModel } from '../ViewModel'

export default class CatchException extends HttpException {
  constructor (error: any, status?: number, user?: UserViewModel) {
    super(error.message || error, status || error.status || 400)
    this.sendSample(error, user)
  }

  private async sendSample (e: any, user?: UserViewModel): Promise<void> {
    const error = new ErrorViewModel()
    error.user = user ? Mapper.map(user, UserInfoViewModel) : null
    error.date = new Date().toISOString()
    error.setSample(e)
    error.observation = 'CatchException'
    await ErrorApp.add(error)
  }
}
