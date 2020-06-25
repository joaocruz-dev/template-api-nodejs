import { Mapper } from '@nartc/automapper'

import { MenuViewModel } from '@/Api/ViewModel'
import { MenuServices } from '@/Domain/Services'

export default class MenuApp {
  static async getAll (): Promise<MenuViewModel[]> {
    const menus = await MenuServices.getAll()
    const menusView = Mapper.mapArray(menus, MenuViewModel)
    return menusView
  }
}
