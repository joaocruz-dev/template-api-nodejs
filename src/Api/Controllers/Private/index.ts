import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AuthMiddleware } from './Middleware/AuthMiddleware'
import { controllers, stringRoutes } from './Middleware/routes'

@Module({ controllers })
export default class PrivateControllers implements NestModule {
  public configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(...stringRoutes)
  }
}
