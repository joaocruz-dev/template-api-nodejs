import { plainToClass } from 'class-transformer'
import { Controller, Req, Body, Get, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common'

import { ProfileViewModel } from '@/Api/ViewModel'
import { ProfileApp } from '@/Application/Services'
import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '@/Api/Middleware/Auth/AuthMiddleware'
import { userControllers } from '@/Api/Middleware/Auth/routes'
import { ProfileValidations, ProfileUpdateValidations } from '@/Api/Validation/validations'

@Controller('profiles')
export default class ProfilesController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<ProfileViewModel[]> {
    try {
      return await ProfileApp.getAll()
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Get('permissions-list')
  getPermissionsList () {
    return userControllers
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Req() req: ReqAuth, @Body() profile: ProfileValidations): Promise<object> {
    try {
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.add(profileView, req.auth.user.id)

      return { message: 'Adicionado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Req() req: ReqAuth, @Body() profile: ProfileUpdateValidations): Promise<object> {
    try {
      profile.isRoot = !!profile.isRoot
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.update(profileView, req.auth.user.id)

      return { message: 'Alterado com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async delete (@Req() req: ReqAuth, @Body() profile: ProfileUpdateValidations): Promise<object> {
    try {
      const profileView = plainToClass(ProfileViewModel, profile)
      await ProfileApp.delete(profileView)

      return { message: 'Excluído com sucesso' }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }
}
