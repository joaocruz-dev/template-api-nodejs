import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import AddressViewModel from '@/Api/ViewModel/Extras/Address/AddressViewModel'
import ProfileViewModel from '@/Api/ViewModel/Extras/Profile/ProfileViewModel'

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
  public phone: string

  @AutoMap()
  public password: string

  @AutoMap()
  public avatar: string

  @Type(() => AddressViewModel)
  @AutoMap(() => AddressViewModel)
  public address: AddressViewModel

  @AutoMap()
  public status: boolean

  @AutoMap()
  public confirmed: boolean

  @AutoMap()
  public idProfile: string

  public profile: ProfileViewModel

  get level () { return this.profile?.level }

  get isRoot () { return this.profile?.isRoot }
}
