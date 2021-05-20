import * as helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import PublicControllers from './Controllers/Public'
import PrivateControllers from './Controllers/Private'

import { DataBase } from '@/Infra/DataBase/DataBase'
import BaseMiddleware from '@/Api/Middleware/Base/BaseMiddleware'

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

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.setGlobalPrefix('api')
  app.enableCors({ origin: true })

  await app.listen(3000)
  await DataBase.connect()
}
bootstrap()
