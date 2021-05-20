import { Mapper } from '@nartc/automapper'

import { Permission } from '@/Domain/Entity'
import { PermissionViewModel } from '@/Api/ViewModel'

Mapper.createMap(Permission, PermissionViewModel)
  .reverseMap()
