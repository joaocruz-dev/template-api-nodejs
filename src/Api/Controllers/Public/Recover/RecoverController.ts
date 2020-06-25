import { Request } from 'express'
import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import RecoverValidations from './validations/RecoverValidations'
import NewPasswordValidations from './validations/NewPasswordValidations'

@Controller('recover')
export default class RecoverController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Req() req: Request, @Body() recover: RecoverValidations): Promise<object> {
    try {
      await UserApp.recover(<string>req.headers.origin, recover.email)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Enviado com sucesso' }
  }

  @Post('new-password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async newPassword (@Body() newPassword: NewPasswordValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, newPassword)
      await UserApp.recoverPassword(userView, newPassword.hash)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Alterado com sucesso' }
  }
}
