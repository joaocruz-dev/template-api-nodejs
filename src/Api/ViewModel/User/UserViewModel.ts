import { AutoMap } from '@nartc/automapper'
import UserGroupViewModel from '../UserGroup/UserGroupViewModel'

export default class UserViewModel {
  @AutoMap()
  public id: string

  @AutoMap()
  public name: string

  @AutoMap()
  public cpf: string

  @AutoMap()
  public email: string

  @AutoMap()
  public password: string

  @AutoMap()
  public phone: string

  @AutoMap()
  public avatar: string

  @AutoMap()
  public usergroup: string

  @AutoMap()
  public status: boolean

  public usergroupViewModel: UserGroupViewModel

  get level () { return this.usergroupViewModel?.level }
}
