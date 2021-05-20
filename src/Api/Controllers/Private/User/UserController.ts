import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'

import Router from '@/Api/Middleware/Auth/Router'
import { CatchException } from '@/Api/HttpException'
import { UserApp, MenuApp } from '@/Application/Services'
import { ReqAuth } from '@/Api/Middleware/Auth/AuthMiddleware'
import { MenuViewModel, UserViewModel } from '@/Api/ViewModel'
import { UserValidations, MessagingTokenValidations, PasswordUpdateValidations } from '@/Api/Validation/validations'

@Controller('user')
export default class UserController {
  @Get()
  async get (@Req() req: ReqAuth) {
    const user = {
      ...req.auth.user,
      level: req.auth.user.level,
      isRoot: req.auth.user.isRoot
    }
    delete user.status
    delete user.idProfile
    delete user.profile
    return user
  }

  @Get('menus')
  async getMenus (@Req() req: ReqAuth): Promise<MenuViewModel[]> {
    try {
      const user = req.auth.user
      let menus = await MenuApp.getAll()

      if (user.level === 1) return menus

      const permissions = Router.defaultPermissions.concat(req.auth.user.profile.permissions || [])
      menus = menus.map(menu => {
        menu.submenus = menu.submenus.filter(submenu => {
          return !!permissions.find(permission => permission.idController === submenu.server)?.idActions.length
        })
        return menu
      })
      return menus.filter(menu => !!menu.submenus.length)
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Post('messaging/token')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async messagingToken (@Req() req: ReqAuth, @Body() messagingToken: MessagingTokenValidations): Promise<object> {
    try {
      await UserApp.addMessagingToken(req.auth.user.id, messagingToken.token)

      return { message: 'Token cadastrado com sucesso!' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Req() req: ReqAuth, @Body() user: UserValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      userView.id = req.auth.user.id
      await UserApp.update(userView)

      return { message: 'Atualizado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Put('password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async putPassword (@Req() req: ReqAuth, @Body() password: PasswordUpdateValidations): Promise<object> {
    try {
      const userView = new UserViewModel()
      userView.id = req.auth.user.id
      userView.password = password.newPassword
      await UserApp.updatePassword(userView, password.password)

      return { message: 'Atualizado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }
}
