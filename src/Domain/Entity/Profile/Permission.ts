import { AutoMap } from '@nartc/automapper'

export default class Permission {
  @AutoMap()
  public idController: string

  @AutoMap()
  public idActions: string[]
}
