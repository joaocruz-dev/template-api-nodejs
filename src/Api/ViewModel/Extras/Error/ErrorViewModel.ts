import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import UserInfoViewModel from '@/Api/ViewModel/User/UserInfoViewModel'

export default class ErrorViewModel {
  @AutoMap()
  public id: string

  @Type(() => UserInfoViewModel)
  @AutoMap(() => UserInfoViewModel)
  public user: UserInfoViewModel

  @AutoMap()
  public date: string

  @AutoMap()
  public sample: string

  @AutoMap()
  public observation: string

  public setSample (e: any): void {
    if (e instanceof TypeError) e = { message: e.message, stack: e.stack }
    else if (typeof e === 'string') e = { message: e }
    this.sample = JSON.stringify(e)
  }
}
