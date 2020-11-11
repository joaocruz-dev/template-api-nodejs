import { Controller, Req, Get } from '@nestjs/common'

import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '../Middleware/AuthMiddleware'

@Controller('dashboard')
export default class DashboardController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<any> {
    try {
      const dash: any = {
        users: await UserApp.getSize()
      }
      return dash
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
