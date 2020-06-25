import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import { controllers } from './Middleware/Routes'
import { AuthMiddleware } from './Middleware/AuthMiddleware'

const stringRoutes = controllers.map(controller => controller.router)
const classControllers = controllers.map(controller => controller.classController)

@Module({ controllers: classControllers })
export default class PrivateControllers implements NestModule {
  public configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(...stringRoutes)
  }
}
