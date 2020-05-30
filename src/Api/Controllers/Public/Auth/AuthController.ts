import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CatchException } from '@/Api/HttpException'
import LoginValidations from './validations/LoginValidations'
import { UserApp } from '@/Application/Services'
import Token from '@/Api/Auth/Token'

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
      const loginApp = await UserApp.login(login.login, login.password)
      const time = login.remember ? 60 * 60 * 24 * 90 : 60 * 60
      const token = Token.sign({ id: loginApp.id }, time)
      return { message: 'Usuário logado', authenticated: true, token }
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
