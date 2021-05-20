import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import CoordinateViewModel from './CoordinateViewModel'

export default class AddressViewModel {
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

  @Type(() => CoordinateViewModel)
  @AutoMap(() => CoordinateViewModel)
  public coordinate: CoordinateViewModel
}
