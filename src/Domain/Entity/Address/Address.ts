import { AutoMap } from '@nartc/automapper'

export default class Address {
  @AutoMap()
  public cep: string

  @AutoMap()
  public street: string

  @AutoMap()
  public number: number

  @AutoMap()
  public district: string

  @AutoMap()
  public complement: string

  @AutoMap()
  public state: string

  @AutoMap()
  public city: string

  @AutoMap()
  public lat: number

  @AutoMap()
  public lng: number
}
