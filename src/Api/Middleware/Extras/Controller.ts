import { AutoMap } from '@nartc/automapper'

import { ClassFunctionType } from '@/Utils'

export class Action {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public route: string

  @AutoMap()
  public method: string
}

export class Controller {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public router: string

  @AutoMap()
  public classController: ClassFunctionType<any>

  @AutoMap()
  public actions: Action[]
}

export class GroupController {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public controllers: Controller[]

  static getPublicGroups (controllers: GroupController[]) {
    return controllers
      .map(permission => {
        permission.controllers = permission.controllers.map(controller => {
          delete controller.router
          controller.actions.map(action => {
            delete action.route
            delete action.method
            return action
          })
          return controller
        })
        return permission
      })
  }
}
