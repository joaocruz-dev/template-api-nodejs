import { Mapper } from '@nartc/automapper'
import { SubMenu } from '@/Domain/Entity'
import { SubMenuViewModel } from '@/Api/ViewModel'

Mapper.createMap(SubMenu, SubMenuViewModel)
