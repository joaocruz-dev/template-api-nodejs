import { Controller, Req, Get } from '@nestjs/common'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import { CatchException } from '@/Api/HttpException'
import { UserApp } from '@/Application/Services'

@Controller('dashboard')
export default class DashboardController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<any> {
    try {
      const dash = {
        users: (await UserApp.getAll()).length
      }
      return dash
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
