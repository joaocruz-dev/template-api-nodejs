import { AutoMap } from '@nartc/automapper'
import { Type } from 'class-transformer'
import RuleViewModel from './RuleViewModel'

export default class UserGroupViewModel {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public level: number

  @Type(() => RuleViewModel)
  @AutoMap(() => RuleViewModel)
  public rules: RuleViewModel[]

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
