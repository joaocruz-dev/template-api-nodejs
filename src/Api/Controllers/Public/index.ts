import { Module } from '@nestjs/common'
import AuthController from './Auth/AuthController'
import BaseController from './Base/BaseController'

@Module({
  controllers: [AuthController, BaseController]
})
export default class PublicControllers {}
