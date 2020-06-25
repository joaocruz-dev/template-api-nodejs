import { Controller, Req, Get } from '@nestjs/common'

import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import { UserApp } from '@/Application/Services'

@Controller('dashboard')
export default class DashboardController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<any> {
    try {
      const level = req.auth.user.level
      const dash: any = {}
      if (level === 1 || level === 2) {
        dash.users = (await UserApp.getAll()).length
      }
      return dash
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
