import { Mapper, mapFrom } from '@nartc/automapper'

import { SubMenu } from '@/Domain/Entity'
import { SubMenuViewModel } from '@/Api/ViewModel'

Mapper.createMap(SubMenu, SubMenuViewModel)
  .forMember(
    dest => dest.query,
    mapFrom(src => src.query)
  )
