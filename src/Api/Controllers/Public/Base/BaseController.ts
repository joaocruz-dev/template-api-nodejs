import { Controller, Get } from '@nestjs/common'

import { version } from '@/../package.json'
import { SettingsApp } from '@/Application/Services'

@Controller()
export default class BaseController {
  @Get()
  get (): string {
    return 'Api <a href="https://project_name.com">project_name</a>'
  }

  @Get('status')
  getStatus (): object {
    return {
      producao: !!process.env.PROD,
      dev: !process.env.PROD,
      mongoDB: SettingsApp.isConnected,
      server: process.env.PROD ? 'https://api.project_name.com/api' : 'http://localhost:3000/api',
      version
    }
  }
}
