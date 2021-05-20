import { Controller, Req, Get } from '@nestjs/common'

import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '@/Api/Middleware/Auth/AuthMiddleware'

@Controller('dashboard')
export default class DashboardController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<any> {
    try {
      const dash: any = {}
      if ([1, 2].includes(req.auth.user.level)) {
        dash.users = await UserApp.getSize()
      }
      return dash
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }
}
