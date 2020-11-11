import { Request } from 'express'
import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { CatchException } from '@/Api/HttpException'
import { UserApp } from '@/Application/Services'
import { UserViewModel } from '@/Api/ViewModel'
import RegisterValidations from './validations/RegisterValidations'
import ConfirmedValidations from './validations/ConfirmedValidations'

@Controller('register')
export default class RegisterController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Req() req: Request, @Body() register: RegisterValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, register)
      await UserApp.register(<string>req.headers.origin, userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Cadastrado com sucesso' }
  }

  @Post('confirmed')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async confirmed (@Body() confirmed: ConfirmedValidations): Promise<object> {
    try {
      await UserApp.confirmed(confirmed.email, confirmed.hash)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Confirmado com sucesso' }
  }
}
