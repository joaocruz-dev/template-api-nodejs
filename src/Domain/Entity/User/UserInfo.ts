import { ObjectId } from 'mongodb'
import { AutoMap } from '@nartc/automapper'

export default class UserInfo {
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
  public avatar: string
}
