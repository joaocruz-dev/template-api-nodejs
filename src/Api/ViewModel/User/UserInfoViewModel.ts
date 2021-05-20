import { AutoMap } from '@nartc/automapper'

export default class UserInfoViewModel {
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
  public avatar: string
}
