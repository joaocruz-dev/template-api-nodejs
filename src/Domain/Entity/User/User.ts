import { ObjectId } from 'mongodb'
import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import Address from '@/Domain/Entity/Extras/Address/Address'
import HashToken from '@/Domain/Entity/Extras/HashToken/HashToken'

export default class User {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public name: string

  @AutoMap()
  public cpf: string

  @AutoMap()
  public email: string

  @AutoMap()
  public phone: string

  @AutoMap()
  public password: string

  @AutoMap()
  public avatar: string

  @Type(() => Address)
  @AutoMap(() => Address)
  public address: Address

  @AutoMap()
  public status: boolean

  @AutoMap()
  public confirmed: boolean

  @AutoMap()
  public idProfile: ObjectId

  @Type(() => HashToken)
  @AutoMap(() => HashToken)
  public hashTokens: HashToken[]

  @AutoMap()
  public messagingTokens: string[]
}
