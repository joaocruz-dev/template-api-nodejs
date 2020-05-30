import { NestMiddleware, Injectable, HttpException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import BaseRepository from '../../Infra/Repository/Base/BaseRepository'

@Injectable()
export default class BaseMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    // if (process.env.PROD && req.headers['x-forwarded-proto'] !== 'https') throw new HttpException({ message: 'Protocolo HTTPS necessário' }, 401)
    if (BaseRepository.isConnected || req.path === '/' || req.path === '/status') return next()
    throw new HttpException({ message: 'Erro servidor' }, 500)
  }
}
