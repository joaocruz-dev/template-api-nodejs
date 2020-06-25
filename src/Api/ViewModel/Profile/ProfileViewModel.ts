import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import PermissionViewModel from './PermissionViewModel'

export default class ProfileViewModel {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public level: number

  @Type(() => PermissionViewModel)
  @AutoMap(() => PermissionViewModel)
  public permissions: PermissionViewModel[]

  @AutoMap()
  public status: boolean

  getLevel () {
    return [
      { value: 1, label: 'Administrador' },
      { value: 2, label: 'Suporte' },
      { value: 3, label: 'Usuário' }
    ]
  }
}
