import { Menu, SubMenu } from '@/Domain/Entity'
import { BaseRepository } from '@/Infra/Repository/Extras/Base/BaseRepository'

export default class MenuRepository extends BaseRepository<Menu> {
  constructor () { super(Menu, 'settings') }

  async getAll (): Promise<Menu[]> {
    const menus: Menu[] = []

    menus.push(this.leads)
    menus.push(this.lgpd)
    menus.push(this.website)
    menus.push(this.earthstorage)
    menus.push(this.billing)
    menus.push(this.permissions)
    menus.push(this.administration)

    return menus
  }

  private get leads () {
    const menu = new Menu()
    menu.name = 'Leads'
    menu.icon = 'eva-inbox'
    menu.url = '/leads'
    menu.submenus = []

    const messages = new SubMenu()
    messages.name = 'Mensagens'
    messages.icon = 'eva-message-square'
    messages.router = 'messages'
    messages.query = null
    messages.server = 'fvxoNdXBSG'
    menu.submenus.push(messages)

    return menu
  }

  private get lgpd () {
    const menu = new Menu()
    menu.name = 'LGPD'
    menu.icon = 'eva-shield'
    menu.url = '/lgpd'
    menu.submenus = []

    const terms = new SubMenu()
    terms.name = 'Termos'
    terms.icon = 'eva-file-text'
    terms.router = 'terms'
    terms.query = null
    terms.server = null
    menu.submenus.push(terms)

    const customers = new SubMenu()
    customers.name = 'Clientes'
    customers.icon = 'eva-person-done'
    customers.router = 'customers'
    customers.query = null
    customers.server = null
    menu.submenus.push(customers)

    const answers = new SubMenu()
    answers.name = 'Respostas'
    answers.icon = 'eva-options-2'
    answers.router = 'answers'
    answers.query = null
    answers.server = null
    menu.submenus.push(answers)

    const protocols = new SubMenu()
    protocols.name = 'Protocolos'
    protocols.icon = 'eva-printer'
    protocols.router = 'protocols'
    protocols.query = null
    protocols.server = null
    menu.submenus.push(protocols)

    return menu
  }

  private get website () {
    const menu = new Menu()
    menu.name = 'WebSite'
    menu.icon = 'eva-browser'
    menu.url = '/website'
    menu.submenus = []

    const create = new SubMenu()
    create.name = 'Criar'
    create.icon = 'eva-layout-outline'
    create.router = 'create'
    create.query = null
    create.server = 'EFesdpRpPO'
    menu.submenus.push(create)

    return menu
  }

  private get earthstorage () {
    const menu = new Menu()
    menu.name = 'EarthStorage'
    menu.icon = 'ion-cloud'
    menu.url = '/earthstorage'
    menu.submenus = []

    const storage = new SubMenu()
    storage.name = 'Armazenamento'
    storage.icon = 'ion-folder'
    storage.router = 'storage'
    storage.query = null
    storage.server = 'EFesdpRpPO'
    menu.submenus.push(storage)

    return menu
  }

  private get billing () {
    const menu = new Menu()
    menu.name = 'Faturamento'
    menu.icon = 'eva-credit-card'
    menu.url = '/billing'
    menu.submenus = []

    const subscriptions = new SubMenu()
    subscriptions.name = 'Assinaturas'
    subscriptions.icon = 'eva-file-text'
    subscriptions.router = 'subscriptions'
    subscriptions.query = null
    subscriptions.server = 'EFesdpRpPO'
    menu.submenus.push(subscriptions)

    const payment = new SubMenu()
    payment.name = 'Pagamento'
    payment.icon = 'eva-award'
    payment.router = 'payment'
    payment.query = null
    payment.server = 'EFesdpRpPO'
    menu.submenus.push(payment)

    return menu
  }

  private get permissions () {
    const menu = new Menu()
    menu.name = 'Permissões'
    menu.icon = 'ion-lock'
    menu.url = '/permissions'
    menu.submenus = []

    const profiles = new SubMenu()
    profiles.name = 'Perfis'
    profiles.icon = 'eva-people'
    profiles.router = 'project-profiles'
    profiles.query = null
    profiles.server = '&Y1&jn6gcj'
    menu.submenus.push(profiles)

    const keys = new SubMenu()
    keys.name = 'Chaves'
    keys.icon = 'ion-key'
    keys.router = 'keys'
    keys.query = null
    keys.server = 'Q5D7xayjzQ'
    menu.submenus.push(keys)

    const collaborators = new SubMenu()
    collaborators.name = 'Colaboradores'
    collaborators.icon = 'ion-person-add'
    collaborators.router = 'collaborators'
    collaborators.query = null
    collaborators.server = '%YiV%HAc#$'
    menu.submenus.push(collaborators)

    return menu
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
