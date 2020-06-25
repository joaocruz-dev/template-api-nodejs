import * as helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import PublicControllers from './Controllers/Public'
import PrivateControllers from './Controllers/Private'

import { dbContext } from '@/Infra/DataBase/DbContext'
import BaseMiddleware from './Middleware/BaseMiddleware'

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

  app.setGlobalPrefix('api')
  app.enableCors({ origin: true })
  app.use(helmet())

  await app.listen(3000)
  await dbContext.connect()
}
bootstrap()
