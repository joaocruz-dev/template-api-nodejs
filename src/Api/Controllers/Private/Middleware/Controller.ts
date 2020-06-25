import { AutoMap } from '@nartc/automapper'

import { ClassFunctionType } from '@/Utils'

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

export class GroupController {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public controllers: Controller[]
}
