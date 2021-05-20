import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import PermissionViewModel from './PermissionViewModel'
import { ChangeHistory } from '@/Infra/Repository/Extras/Base/BaseRepository'

export default class ProfileViewModel {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public level: number

  @AutoMap()
  public isRoot: boolean

  @AutoMap()
  public status: boolean

  @Type(() => PermissionViewModel)
  @AutoMap(() => PermissionViewModel)
  public permissions: PermissionViewModel[]

  @Type(() => ChangeHistory)
  @AutoMap(() => ChangeHistory)
  public changeHistory: ChangeHistory[]

  public getLevel () {
    return [
      { value: 1, label: 'Administrador' },
      { value: 2, label: 'Suporte' },
      { value: 3, label: 'Usuário' }
    ]
  }
}
