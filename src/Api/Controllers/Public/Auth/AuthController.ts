import { CatchException } from '@/Api/HttpException'
import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import Token from '@/Api/Functions/Auth/Token'
import { UserApp } from '@/Application/Services'
import { LoginValidations } from '@/Api/Validation/validations'

interface accessToken {
  token: string
  authenticated: boolean
  message: string
}

@Controller('auth')
export default class AuthController {
  @Post('token')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async auth (@Body() login: LoginValidations): Promise<accessToken> {
    try {
      const user = await UserApp.login(login.login, login.password)
      const time = login.remember ? 60 * 60 * 24 * 90 : 60 * 60
      const token = Token.sign({ id: user.id }, time)
      return { message: 'Usuário logado', authenticated: true, token }
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
