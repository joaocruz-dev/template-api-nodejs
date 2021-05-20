import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import UserInfo from '@/Domain/Entity/User/UserInfo'

export default class _Error {
  @AutoMap()
  public _id: ObjectId

  @Type(() => UserInfo)
  @AutoMap(() => UserInfo)
  public user: UserInfo

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
