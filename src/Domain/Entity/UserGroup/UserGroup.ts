import { AutoMap } from '@nartc/automapper'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongodb'
import Rule from './Rule'

export default class UserGroup {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public name: string

  /*
    1 - Administrador
    2 - Suporte
    3 - Usuário
  */
  @AutoMap()
  public level: number

  @Type(() => Rule)
  @AutoMap(() => Rule)
  public rules: Rule[]

  @AutoMap()
  public status: boolean

  public userUpdate: ObjectId
  public userCreated: ObjectId
  public dateUpdate: string
  public dateCreated: string
}
