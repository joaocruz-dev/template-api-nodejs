import { Request, Response, NextFunction } from 'express'
import { NestMiddleware, Injectable, HttpException } from '@nestjs/common'

import Router from './Router'
import Token from '@/Api/Functions/Auth/Token'
import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'

export interface Auth {
  user: UserViewModel
}

export interface ReqAuth extends Request {
  auth: Auth
}

interface decodedToken {
  id: string
  iat: number
  exp: number
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use (req: ReqAuth, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization || false
      if (!token) throw new Error('Autenticação Necessária')

      token = token.split(' ')[1]
      const decoded = <decodedToken>Token.verify(token)

      const user = await UserApp.getId(decoded.id)
      if (!user) throw new Error('Usuário não encontrado')
      if (!user.status) throw new Error('Usuário desativado')
      if (!user.profile) throw new Error('Perfil não encontrado')
      if (!user.profile.status) throw new Error('Perfil desativado')

      const auth = <Auth>{ user }
      const router = new Router(req, auth)
      const verify = await router.verify()
      if (!verify) throw new HttpException('Não Autorizado', 403) // Área Restrita

      req.auth = auth
      next()
    } catch (err) {
      const status = err.status || 401
      throw new HttpException(err.message, status)
    }
  }
}

export default AuthMiddleware
