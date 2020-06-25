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
