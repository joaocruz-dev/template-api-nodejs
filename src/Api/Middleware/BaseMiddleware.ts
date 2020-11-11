import { Request, Response, NextFunction } from 'express'
import { NestMiddleware, Injectable, HttpException } from '@nestjs/common'

import { SettingsApp } from '@/Application/Services'

@Injectable()
export default class BaseMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    if (SettingsApp.isConnected || req.path === '/' || req.path === '/status') return next()
    throw new HttpException({ message: 'Banco de Dados offline' }, 500)
  }
}
