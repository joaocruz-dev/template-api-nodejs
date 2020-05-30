import { AutoMap } from '@nartc/automapper'

export default class SubMenu {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public router: string

  @AutoMap()
  public url: string

  @AutoMap()
  public server: string
}
