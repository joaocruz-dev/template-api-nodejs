import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import Permission from './Permission'
import { ChangeHistory } from '@/Infra/Repository/Extras/Base/BaseRepository'

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
    Projeto
    1 - Proprietário
    2 - Gerente
    3 - Colaborador
  */
  @AutoMap()
  public level: number

  @AutoMap()
  public isRoot: boolean

  @AutoMap()
  public status: boolean

  @Type(() => Permission)
  @AutoMap(() => Permission)
  public permissions: Permission[]

  @Type(() => ChangeHistory)
  @AutoMap(() => ChangeHistory)
  public changeHistory: ChangeHistory[]
}
