import { AutoMap } from '@nartc/automapper'

export default class PermissionViewModel {
  @AutoMap()
  public idController: string

  @AutoMap()
  public idActions: string[]
}
