import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Put, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import UserValidations from './validations/UserValidations'
import PasswordValidations from './validations/PasswordValidations'
import { UserApp, MenuApp } from '@/Application/Services'

@Controller('user')
export default class UserController {
  @Get()
  async get (@Req() req: ReqAuth) {
    const user = { ...req.auth.user, level: req.auth.user.level }
    delete user.status
    delete user.idProfile
    delete user.profile
    return user
  }

  @Get('menus')
  async getMenus (@Req() req: ReqAuth) {
    const user = req.auth.user
    let menus = await MenuApp.getAll()

    if (user.level === 1) return menus

    const permissions = req.auth.user.profile.permissions || []
    menus = menus.map(menu => {
      menu.submenus = menu.submenus.filter(submenu => {
        return !!permissions.find(permission => permission.idController === submenu.server)?.idActions.length
      })
      return menu
    })
    return menus.filter(menu => !!menu.submenus.length)
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Req() req: ReqAuth, @Body() user: UserValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      userView.id = req.auth.user.id
      await UserApp.update(userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Atualizado com sucesso' }
  }

  @Put('password')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async putPassword (@Req() req: ReqAuth, @Body() passwords: PasswordValidations): Promise<object> {
    try {
      const userView = new UserViewModel()
      userView.id = req.auth.user.id
      userView.password = passwords.newPassword
      await UserApp.updatePassword(passwords.password, userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Atualizado com sucesso' }
  }
}
