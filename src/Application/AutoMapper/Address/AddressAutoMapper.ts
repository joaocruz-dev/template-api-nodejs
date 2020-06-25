import { Mapper } from '@nartc/automapper'

import { Address } from '@/Domain/Entity'
import { AddressViewModel } from '@/Api/ViewModel'

Mapper.createMap(Address, AddressViewModel)
  .reverseMap()
