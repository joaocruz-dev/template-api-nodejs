import { plainToClass } from 'class-transformer'
import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { InvitationValidations, GetInvitationValidations } from '@/Api/Validation/validations'

@Controller('register')
export default class RegisterController {
  @Post('invitation/info')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async infoRegistrated (@Body() invitation: GetInvitationValidations): Promise<object> {
    try {
      const user = await UserApp.infoRegistrated(invitation.email, invitation.hash)
      if (user.confirmed) return user
      return {
        name: user.name,
        cpf: user.cpf,
        phone: user.phone
      }
    } catch (error) {
      throw new CatchException(error)
    }
  }

  @Post('invitation')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async confirmed (@Body() invitation: InvitationValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, invitation)
      await UserApp.registrated(userView, invitation.hash)

      return { message: 'Usuário confirmado com sucesso' }
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
