import { Controller, Req, Body, Get, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import { CatchException } from '@/Api/HttpException'
import UserValidations from './validations/UserValidations'
import PasswordValidations from './validations/PasswordValidations'
import { UserApp, MenuApp } from '@/Application/Services'
import { UserViewModel } from '@/Api/ViewModel'

@Controller('user')
export default class UserController {
  @Get()
  async get (@Req() req: ReqAuth) {
    const user = { ...req.auth.user, level: req.auth.user.level }
    delete user.status
    delete user.usergroup
    delete user.usergroupViewModel
    return user
  }

  @Get('menus')
  async getMenus (@Req() req: ReqAuth) {
    const user = req.auth.user
    const rules = req.auth.user.usergroupViewModel.rules
    let menus = await MenuApp.getAll()
    if (user.level === 1) return menus
    if (!rules || !rules.length) return []
    menus = menus.map(menu => {
      menu.submenus = menu.submenus.filter(submenu => {
        return !!rules.find(rule => rule.route === submenu.server)?.actions.length
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
