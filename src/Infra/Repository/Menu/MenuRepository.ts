import { Menu, SubMenu } from '@/Domain/Entity'
import { BaseRepository } from '../Base/BaseRepository'

export default class MenuRepository extends BaseRepository<Menu> {
  constructor () { super(Menu, 'settings') }

  async getAll (): Promise<Menu[]> {
    const menus: Menu[] = []

    menus.push(this.administration)

    return menus
  }

  private get administration () {
    const menu = new Menu()
    menu.name = 'Administração'
    menu.icon = 'las la-user-shield'
    menu.url = '/administration'
    menu.submenus = []

    const users = new SubMenu()
    users.name = 'Usuários'
    users.icon = 'las la-user'
    users.router = 'users'
    users.server = 'TF2WbNN1li'
    menu.submenus.push(users)

    const profiles = new SubMenu()
    profiles.name = 'Perfis'
    profiles.icon = 'las la-id-card'
    profiles.router = 'profiles'
    profiles.server = 'Ws2WpAReby'
    menu.submenus.push(profiles)

    return menu
  }
}
