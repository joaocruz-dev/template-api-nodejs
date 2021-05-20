import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import { controllers } from '@/Api/Middleware/Auth/routes'
import AuthMiddleware from '@/Api/Middleware/Auth/AuthMiddleware'

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
