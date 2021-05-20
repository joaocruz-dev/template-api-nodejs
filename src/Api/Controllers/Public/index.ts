import { Module } from '@nestjs/common'

import AuthController from './Auth/AuthController'
import BaseController from './Base/BaseController'
import RecoverController from './Recover/RecoverController'
import RegisterController from './Register/RegisterController'

@Module({
  controllers: [AuthController, BaseController, RecoverController, RegisterController]
})
export default class PublicControllers {}
