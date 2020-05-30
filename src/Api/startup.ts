import { NestFactory } from '@nestjs/core'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import * as helmet from 'helmet'

import PrivateControllers from './Controllers/Private'
import PublicControllers from './Controllers/Public'

import BaseMiddleware from './Middleware/BaseMiddleware'

import { dbContext } from '@/Infra/DataBase/DbContext'

@Module({
  imports: [PrivateControllers, PublicControllers]
})
class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(BaseMiddleware)
      .forRoutes('')
  }
}

let origin: string[]|boolean
if (process.env.PROD) {
  origin = [
    'https://acampo.com.br',
    'https://app.acampo.com.br',
    'https://adm.acampo.com.br'
  ]
} else origin = true

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors({ origin })
  app.use(helmet())

  await app.listen(3000)
  await dbContext.connect()
}
bootstrap()
