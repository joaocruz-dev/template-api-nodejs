import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserViewModel } from '@/Api/ViewModel'
import { UserApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import UsersValidations from './validations/UsersValidations'
import UsersUpdateValidations from './validations/UsersUpdateValidations'

@Controller('users')
export default class UsersController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<UserViewModel[]> {
    const _users = await UserApp.getAll()
    const users: any[] = []
    _users.forEach(user => {
      const level = user.level
      delete user.profile
      users.push({ ...user, level })
    })
    return users
    // if (req.auth.user.level === 1) return users
    // return users.filter(user => user.level >= req.auth.user.level)
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Req() req: ReqAuth, @Body() user: UsersValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.add(<string>req.headers.origin, userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Adicionado com sucesso' }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Body() user: UsersUpdateValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.update(userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Alterado com sucesso' }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async delete (@Body() user: UsersUpdateValidations): Promise<object> {
    try {
      const userView = plainToClass(UserViewModel, user)
      await UserApp.delete(userView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Excluído com sucesso' }
  }
}
