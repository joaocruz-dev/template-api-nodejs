import { Menu, SubMenu } from '@/Domain/Entity'
import { BaseRepository } from '@/Infra/Repository/Extras/Base/BaseRepository'

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
    menu.icon = 'eva-settings'
    menu.url = '/administration'
    menu.submenus = []

    const profiles = new SubMenu()
    profiles.name = 'Perfis'
    profiles.icon = 'eva-people'
    profiles.router = 'profiles'
    profiles.query = null
    profiles.server = 'Ws2WpAReby'
    menu.submenus.push(profiles)

    const users = new SubMenu()
    users.name = 'Usuários'
    users.icon = 'eva-person'
    users.router = 'users'
    users.query = null
    users.server = 'aHPjlf5amT'
    menu.submenus.push(users)

    const projects = new SubMenu()
    projects.name = 'Projetos'
    projects.icon = 'eva-bulb'
    projects.router = 'projects'
    projects.query = null
    projects.server = 'R#5yPsxhdc'
    menu.submenus.push(projects)

    return menu
  }
}
