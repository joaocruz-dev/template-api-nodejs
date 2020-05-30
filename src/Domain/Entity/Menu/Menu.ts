import { AutoMap } from '@nartc/automapper'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongodb'
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
  public userUpdate: ObjectId
  public userCreated: ObjectId
  public dateUpdate: string
  public dateCreated: string
}
