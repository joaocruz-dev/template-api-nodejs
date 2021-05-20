import { Mapper } from '@nartc/automapper'

import { Coordinate } from '@/Domain/Entity'
import { CoordinateViewModel } from '@/Api/ViewModel'

Mapper.createMap(Coordinate, CoordinateViewModel)
  .reverseMap()
