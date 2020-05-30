import { NestMiddleware, Injectable, HttpException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import Token from '@/Api/Auth/Token'
import Router from './Router'
import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'

export interface ReqAuth extends Request {
  auth: Auth
}

interface decodedToken {
  id: string
  iat: number
  exp: number
}

export interface Auth {
  user: UserViewModel
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use (req: ReqAuth, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization || false
      if (!token) throw new HttpException('Autenticação Necessária', 401)
      token = token.split(' ')[1]
      const decoded = <decodedToken>Token.verify(token)
      const user = await UserApp.getId(decoded.id)
      const auth = <Auth>{ user }
      const router = new Router(req, auth)
      const verify = router.verify()
      if (!verify) throw new HttpException('Área Restrita', 403) // Não Autorizado
      req.auth = auth
      next()
    } catch (err) {
      const status = err.status ? err.status : 401
      throw new HttpException(err.message, status)
    }
  }
}
