import { AutoMap } from '@nartc/automapper'

import ProfileViewModel from '../Profile/ProfileViewModel'

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
  public idProfile: string

  @AutoMap()
  public status: boolean

  public profile: ProfileViewModel

  get level () { return this.profile?.level }
}
