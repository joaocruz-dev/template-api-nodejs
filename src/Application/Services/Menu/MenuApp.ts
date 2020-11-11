import { Mapper } from '@nartc/automapper'

import { MenuViewModel } from '@/Api/ViewModel'
import { MenuServices } from '@/Domain/Services'

const menuServices = new MenuServices()

export default class MenuApp {
  static async getAll (): Promise<MenuViewModel[]> {
    const menus = await menuServices.getAll()
    const menusView = Mapper.mapArray(menus, MenuViewModel)
    return menusView
  }
}
