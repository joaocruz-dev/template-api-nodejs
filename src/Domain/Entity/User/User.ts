import { AutoMap } from '@nartc/automapper'
import { ObjectId } from 'mongodb'

export default class User {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public name: string

  @AutoMap()
  public email: string

  @AutoMap()
  public password: string

  @AutoMap()
  public phone: string

  @AutoMap()
  public avatar: string

  @AutoMap()
  public usergroup: ObjectId

  @AutoMap()
  public status: boolean

  @AutoMap()
  public hashPassword: string

  @AutoMap()
  public confirmed: boolean

  @AutoMap()
  public hashConfirmed: string

  public userUpdate: ObjectId
  public userCreated: ObjectId
  public dateUpdate: string
  public dateCreated: string
}
