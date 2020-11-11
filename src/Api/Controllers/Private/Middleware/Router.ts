import { Request } from 'express'
import { HttpException } from '@nestjs/common'

import { controllers } from './routes'
import { Auth } from './AuthMiddleware'
import { Controller, Action } from './Controller'
import { PermissionViewModel } from '@/Api/ViewModel'

export default class Routes {
  private req: Request = null
  private auth: Auth = null

  constructor (req: Request, auth: Auth) {
    this.req = req
    this.auth = auth
  }

  private get user () {
    return this.auth.user
  }

  // private get url () {
  //   return this.req.originalUrl.split('/api/')[1]
  // }

  private get method () {
    return this.req.method
  }

  private get path (): string {
    try {
      const url = this.req.originalUrl.split('?')[0]
      const layer = this.req.app._router.stack.find((layer: any) => {
        return layer.regexp.exec(url) && layer.route
      })
      return layer.route.path.split('/api/')[1]
    } catch (error) {
      throw new HttpException('Router não encontrado', 403)
    }
  }

  public async verify (): Promise<boolean> {
    const level = this.user.level

    // Administrador
    if (level === 1) return true

    // Suporte
    if (level === 2) return await this.checkPermissions()

    // if (this.req.headers.origin === 'https://admin.project_name.com') return false

    // Usuário
    if (level === 3) return await this.checkPermissions()

    return false
  }

  private async checkPermissions (): Promise<boolean> {
    const { controller, action } = this.getAction()

    const user = this.permissionsUser(controller, action)

    return user
  }

  private permissionsUser (controller: Controller, action: Action): boolean {
    const permissions = this.defaultPermissions().concat(this.user.profile.permissions || [])

    const permissionController = permissions.find(permission => permission.idController === controller.id)
    if (!permissionController) return false
    const permissionAction = permissionController.idActions.find(a => a === action.id)
    if (!permissionAction) return false

    return true
  }

  private getAction () {
    const controller = controllers.find(controller => `${this.path}/`.startsWith(`${controller.router}/`))
    if (!controller) throw new HttpException('Controller não encontrado', 403)
    const path = this.path.split(`${controller.router}/`)[1] || null
    const action = controller.actions.find(action => action.route === path && action.method === this.method)
    if (!action) throw new HttpException('Action não encontrada', 403)
    return { controller, action }
  }

  private defaultPermissions () {
    const permissions: PermissionViewModel[] = []

    const dashboard = new PermissionViewModel()
    dashboard.idController = 'sbK9joAF0P'
    dashboard.idActions = ['5j3UzwwUNp']
    if ([1, 2].includes(this.user.profile.level)) permissions.push(dashboard)

    const options = new PermissionViewModel()
    options.idController = 'fVLNQtFeSy'
    options.idActions = ['tpVAy90Ws0']
    permissions.push(options)

    const user = new PermissionViewModel()
    user.idController = 'lFSfYSrNkQ'
    user.idActions = ['DimqZritcg', 'R2It9FK0yL', 'YojNf17PPR', 'QZWBAJuJqj']
    permissions.push(user)

    return permissions
  }
}
