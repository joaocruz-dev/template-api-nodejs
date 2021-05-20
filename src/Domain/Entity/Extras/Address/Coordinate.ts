import { AutoMap } from '@nartc/automapper'

export default class Coordinate {
  @AutoMap()
  public lat: number

  @AutoMap()
  public lng: number
}
