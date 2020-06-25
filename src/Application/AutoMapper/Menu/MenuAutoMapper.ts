import { Mapper } from '@nartc/automapper'

import { Menu } from '@/Domain/Entity'
import { MenuViewModel } from '@/Api/ViewModel'

Mapper.createMap(Menu, MenuViewModel)
