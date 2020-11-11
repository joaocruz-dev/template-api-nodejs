import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import Permission from './Permission'
import { ChangeHistory } from '@/Infra/Repository/Base/BaseRepository'

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
  */
  @AutoMap()
  public level: number

  @Type(() => Permission)
  @AutoMap(() => Permission)
  public permissions: Permission[]

  @AutoMap()
  public status: boolean

  @Type(() => ChangeHistory)
  @AutoMap(() => ChangeHistory)
  changeHistory: ChangeHistory[]
}
