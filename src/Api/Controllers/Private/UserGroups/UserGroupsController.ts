import { Controller, Req, Body, Get, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { ReqAuth } from '../Middleware/AuthMiddleware'
import { routes } from '../Middleware/routes'
import { CatchException } from '@/Api/HttpException'
import UserGroupValidations from './validations/UserGroupValidations'
import UserGroupUpdateValidations from './validations/UserGroupUpdateValidations'
import { UserGroupApp } from '@/Application/Services'
import { UserGroupViewModel } from '@/Api/ViewModel'

@Controller('usergroups')
export default class UserGroupsController {
  @Get()
  async get (@Req() req: ReqAuth): Promise<UserGroupViewModel[]> {
    const groups = await UserGroupApp.getAll()
    return groups
    // if (req.auth.user.level === 1) return groups
    // return groups.filter(group => group.level > req.auth.user.level)
  }

  @Get('routes')
  async getRoutes () {
    const groups = [
      { icon: 'las la-user-shield', label: 'Administração' },
      { icon: 'account_tree', label: 'Cadastros' }
    ]
      .map(group => ({ ...group, routes: routes.filter(route => route.group === group.label) }))
    return groups
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async post (@Body() group: UserGroupValidations): Promise<object> {
    try {
      let groupView = plainToClass(UserGroupViewModel, group)
      groupView = actionsRule(groupView)
      await UserGroupApp.add(groupView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Adicionado com sucesso' }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async put (@Body() group: UserGroupUpdateValidations): Promise<object> {
    try {
      let groupView = plainToClass(UserGroupViewModel, group)
      groupView = actionsRule(groupView)
      await UserGroupApp.update(groupView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Alterado com sucesso' }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async delete (@Body() group: UserGroupUpdateValidations): Promise<object> {
    try {
      const groupView = plainToClass(UserGroupViewModel, group)
      if (
        groupView.id === '5e5be02f1a43784474b14230' ||
        groupView.id === '5e5be02f1a43784474b14231'
      ) throw new CatchException('Este Grupo de Usuário não pode ser excluído', 403)
      await UserGroupApp.delete(groupView)
    } catch (error) {
      throw new CatchException(error)
    }
    return { message: 'Excluído com sucesso' }
  }
}

function actionsRule (groupView: UserGroupViewModel): UserGroupViewModel {
  groupView.rules = groupView.rules.map(rule => {
    if (rule.actions.length && !rule.actions.find(action => action === 'view')) rule.actions.push('view')
    return rule
  })
  return groupView
}
