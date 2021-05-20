import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Post, Put, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '@/Api/Middleware/Auth/AuthMiddleware'
import { AdminUsersValidations, AdminUsersUpdateValidations } from '@/Api/Validation/validations'

@Controller('admin/users')
export default class AdminUsersController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<UserViewModel[]> {
    try {
      const users = await UserApp.getAll()
      return users
        .map(x => {
          const level = x.level
          delete x.profile
          return <UserViewModel> { ...x, level }
        })
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Req() req: ReqAuth, @Body() user: AdminUsersValidations, @Query('send-email') sendEmail: number): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.add(userView, sendEmail !== 0)

      return { message: 'Adicionado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Post('send-email')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async sendEmail (@Req() req: ReqAuth, @Body() user: AdminUsersUpdateValidations): Promise<object> {
    try {
      await UserApp.sendEmail(user.id)

      return { message: 'E-mail reenviado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Req() req: ReqAuth, @Body() user: AdminUsersUpdateValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.update(userView)

      return { message: 'Alterado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async delete (@Req() req: ReqAuth, @Body() user: AdminUsersUpdateValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.delete(userView)

      return { message: 'Excluído com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }
}
