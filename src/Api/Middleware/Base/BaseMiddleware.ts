import { Request, Response, NextFunction } from 'express'
import { NestMiddleware, Injectable, HttpException } from '@nestjs/common'

import ServerData from '@/Api/Functions/Server/ServerData'

const server = new ServerData()

@Injectable()
export default class BaseMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    if (server.mongodb || req.path === '/' || req.path === '/status') return next()
    throw new HttpException({ message: 'Banco de Dados offline' }, 500)
  }
}
