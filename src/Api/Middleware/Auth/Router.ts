import { Request } from 'express'
import { HttpException } from '@nestjs/common'

import { controllers } from './routes'
import { Auth } from './AuthMiddleware'
import { PermissionViewModel } from '@/Api/ViewModel'
import { Controller, Action } from '@/Api/Middleware/Extras/Controller'

export default class Router {
  constructor (
    private req: Request,
    private auth: Auth
  ) {}

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
    return Router.mountPath(this.req)
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

    return this.permissionsUser(controller, action)
  }

  private permissionsUser (controller: Controller, action: Action): boolean {
    const permissions = Router.defaultPermissions.concat(this.user.profile.permissions || [])

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

  static mountPath (req: Request, root = false): string {
    try {
      const url = req.originalUrl.split('?')[0]
      const layer = req.app._router.stack.find((layer: any) => {
        return layer.regexp.exec(url) && layer.route
      })
      return root ? layer.route.path : layer.route.path.split('/api/')[1]
    } catch (error) {
      throw new HttpException('Router não encontrado', 403)
    }
  }

  static getParams (req: Request): any {
    const url = req.originalUrl.split('/')
    const path = Router.mountPath(req, true).split('/')

    const params: any = {}
    for (let i = 0; i < path.length; i++) {
      if (path[i].startsWith(':')) params[path[i].replace(':', '')] = url[i]
    }
    return params
  }

  static get defaultPermissions () {
    const permissions: PermissionViewModel[] = []

    // Dashboard
    const dashboard = new PermissionViewModel()
    dashboard.idController = 'EFesdpRpPO'
    dashboard.idActions = ['$wGTjlOCMy']
    permissions.push(dashboard)

    // Extras
    const address = new PermissionViewModel()
    address.idController = '$vjJOlzsKB'
    address.idActions = ['YmQV20Lqq#']
    permissions.push(address)

    const options = new PermissionViewModel()
    options.idController = 'RapG0NW6ON'
    options.idActions = ['2CUNkDcN2m']
    permissions.push(options)

    // User
    const user = new PermissionViewModel()
    user.idController = '5ZoR2B@yrc'
    user.idActions = ['ybpz@1#o7#', 'kdxtGvuhrb', 'KqT195h9Ji', 'eR2ZTiJ@Mv', 'F96JMzSxg1']
    permissions.push(user)

    return permissions
  }
}
