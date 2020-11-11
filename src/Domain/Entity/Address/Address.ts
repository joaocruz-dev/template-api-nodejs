import { Type } from 'class-transformer'
import { AutoMap } from '@nartc/automapper'

import Coordinate from './Coordinate'

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

  @Type(() => Coordinate)
  @AutoMap(() => Coordinate)
  public coordinate: Coordinate
}
