import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import SubMenu from './SubMenu'

export default class Menu {
  @AutoMap()
  public name: string

  @AutoMap()
  public icon: string

  @AutoMap()
  public url: string

  @Type(() => SubMenu)
  @AutoMap(() => SubMenu)
  public submenus: SubMenu[]

  public _id: ObjectId
}
