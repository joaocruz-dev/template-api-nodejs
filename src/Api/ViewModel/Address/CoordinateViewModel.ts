import { AutoMap } from '@nartc/automapper'

export default class CoordinateViewModel {
  @AutoMap()
  public lat: number

  @AutoMap()
  public lng: number
}
