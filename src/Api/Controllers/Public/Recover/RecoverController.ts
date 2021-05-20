import { plainToClass } from 'class-transformer'
import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { RecoverValidations, PasswordRecoverValidations } from '@/Api/Validation/validations'

@Controller('recover')
export default class RecoverController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Body() recover: RecoverValidations): Promise<object> {
    try {
      await UserApp.recover(recover.email)

      return { message: 'Enviado com sucesso' }
    } catch (error) {
      throw new CatchException(error)
    }
  }

  @Post('new-password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async newPassword (@Body() newPassword: PasswordRecoverValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, newPassword)
      await UserApp.updatePassword(userView, newPassword.hash)

      return { message: 'Alterado com sucesso' }
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
