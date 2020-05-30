import { Collection } from 'mongodb'
import { Menu, SubMenu } from '@/Domain/Entity'

export default class MenusMigrations {
  private db: Collection
  constructor (db: Collection) { this.db = db }

  async set () {
    let menus = await this.db.find().toArray()
    if (menus.length) {
      for (let i = 0; i < menus.length; i++) {
        await this.db.deleteOne(menus[i])
      }
    }
    menus = []
    menus.push(this.administration)
    await this.db.insertMany(menus)
  }

  private get administration () {
    const menu = new Menu()
    menu.name = 'Administração'
    menu.icon = 'las la-user-shield'
    menu.url = '/administration'
    menu.submenus = []

    const users = new SubMenu()
    users.name = 'Usuários'
    users.icon = 'person'
    users.router = 'users'
    users.url = '/users'
    users.server = 'users'
    menu.submenus.push(users)

    const userGroups = new SubMenu()
    userGroups.name = 'Grupo de Usuários'
    userGroups.icon = 'people'
    userGroups.router = 'usergroups'
    userGroups.url = '/usergroups'
    userGroups.server = 'usergroups'
    menu.submenus.push(userGroups)

    return menu
  }
}
