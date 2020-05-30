import { Mapper } from '@nartc/automapper'
import { MenuServices } from '@/Domain/Services'
import { MenuViewModel } from '@/Api/ViewModel'

export default class MenuApp {
  static async getAll (): Promise<MenuViewModel[]> {
    const menus = await MenuServices.getAll()
    const menusView = Mapper.mapArray(menus, MenuViewModel)
    return menusView
  }
}
