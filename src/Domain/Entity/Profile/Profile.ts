import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import Permission from './Permission'

export default class Profile {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public name: string

  /*
    Usuário
    1 - Administrador
    2 - Suporte
    3 - Usuário
    Funcionário
    1 - Proprietário
    2 - Gerente
    3 - Funcionário
  */
  @AutoMap()
  public level: number

  @Type(() => Permission)
  @AutoMap(() => Permission)
  public permissions: Permission[]

  @AutoMap()
  public status: boolean

  public userUpdate: ObjectId
  public userCreated: ObjectId
  public dateUpdate: string
  public dateCreated: string
}
