import { AutoMap } from '@nartc/automapper'

export default class SubMenuViewModel {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public router: string

  @AutoMap()
  public server: string
}
