import { Request } from 'express'
import { Auth } from './AuthMiddleware'

export default class Routes {
  private req: Request = null
  private auth: Auth = null

  constructor (req: Request, auth: Auth) {
    this.req = req
    this.auth = auth
  }

  verify (): boolean {
    const level = this.auth.user.level
    const path = this.req.originalUrl.split('/api/')[1]
    const action = Routes.actions.find(a => a.id === this.req.method)?.value
    if (!action) return false

    // Administrador
    if (level === 1) return true

    // Suporte
    if (level === 2) {
      return this.checkRoutes(path, action)
    }

    // Proprietário
    if (level === 3) {
      return this.checkRoutes(path, action)
    }

    // Usuário
    if (level === 4) {
      return this.checkRoutes(path, action)
    }
  }

  private checkRoutes (path: string, action: string): boolean {
    const rules = this.auth.user.usergroupViewModel.rules
    if (Routes.defaultRoutes.find(route => this.startsWith(path, route))) return true
    if (!rules && !rules.length) return false
    const rule = rules.find(roule => this.startsWith(path, roule.route))
    if (!rule) return false
    return !!rule.actions.find(a => a === action)
  }

  private startsWith (path: string, route: string): boolean {
    return `${path}/`.startsWith(`${route}/`)
  }

  static get actions () {
    return [
      { id: 'GET', value: 'view' },
      { id: 'POST', value: 'add' },
      { id: 'PUT', value: 'update' },
      { id: 'DELETE', value: 'delete' }
    ]
  }

  static get defaultRoutes () {
    return ['user', 'dashboard', 'address', 'options']
  }
}
