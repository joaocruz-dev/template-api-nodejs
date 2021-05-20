import { Controller, Get } from '@nestjs/common'

import ServerData from '@/Api/Functions/Server/ServerData'

const server = new ServerData()

@Controller()
export default class BaseController {
  @Get()
  get (): string {
    return `Api <a href="${server.view}">project_name</a>`
  }

  @Get('status')
  getStatus (): object {
    return {
      version: server.version,
      mongodb: server.mongodb,
      environment: server.environment,

      sandbox: server.isSandBox,
      production: server.isProduction,
      development: server.isDevelopment,

      view: server.view,
      server: server.server
    }
  }
}
