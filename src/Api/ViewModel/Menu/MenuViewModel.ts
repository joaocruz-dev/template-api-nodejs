import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import SubMenuViewModel from './SubMenuViewModel'

export default class MenuViewModel {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public url: string

  @Type(() => SubMenuViewModel)
  @AutoMap(() => SubMenuViewModel)
  public submenus: SubMenuViewModel[]
}
