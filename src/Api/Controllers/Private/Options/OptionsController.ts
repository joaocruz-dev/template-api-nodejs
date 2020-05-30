import { Controller, Get } from '@nestjs/common'
import { UserGroupViewModel } from '@/Api/ViewModel'

@Controller('options')
export default class OptionsController {
  @Get()
  async get () {
    return {
      optionsUserGroupLevel: new UserGroupViewModel().getLevel()
    }
  }
}
