import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common'

import { ProfileViewModel } from '@/Api/ViewModel'
import { ProfileApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import { userControllers } from '../Middleware/Routes'
import { ProfileValidations, ProfileUpdateValidations } from '../validations'

@Controller('profiles')
export default class ProfilesController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<ProfileViewModel[]> {
    const profiles = await ProfileApp.getAll()
    return profiles
  }

  @Get('permissions-list')
  getPermissionsList () {
    return userControllers
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Body() profile: ProfileValidations): Promise<object> {
    try {
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.add(profileView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Adicionado com sucesso' }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Body() profile: ProfileUpdateValidations): Promise<object> {
    try {
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.update(profileView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Alterado com sucesso' }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async delete (@Body() profile: ProfileUpdateValidations): Promise<object> {
    try {
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.delete(profileView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Excluído com sucesso' }
  }
}
