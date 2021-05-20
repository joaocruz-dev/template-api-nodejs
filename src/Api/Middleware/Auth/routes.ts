import { Controller, Action, GroupController } from '@/Api/Middleware/Extras/Controller'

// Dashboard
import DashboardController from '@/Api/Controllers/Private/Dashboard/DashboardController'

// Extras
import AddressController from '@/Api/Controllers/Private/Extras/Address/AddressController'
import OptionsController from '@/Api/Controllers/Private/Extras/Options/OptionsController'

// User
import UserController from '@/Api/Controllers/Private/User/UserController'
import AdminUsersController from '@/Api/Controllers/Private/User/Admin/AdminUsersController'
import ProfilesController from '@/Api/Controllers/Private/User/Profile/ProfilesController'

class Routes {
  // CONTROLLERS
  public get controllers () {
    const controllers: Controller[] = []

    // Dashboard
    controllers.push(this.dashboard)

    // Extras
    controllers.push(this.address)
    controllers.push(this.options)

    // User
    controllers.push(this.user)
    controllers.push(this.adminUsers)
    controllers.push(this.profiles)

    return controllers
  }

  // GROUPS CONTROLLER
  public get userControllers () {
    const list: GroupController[] = []

    const administration = new GroupController()
    administration.name = 'Administração'
    administration.icon = 'eva-settings'
    administration.controllers = [this.profiles, this.adminUsers]
    list.push(administration)

    return GroupController.getPublicGroups(list)
  }

  // ROUTES

  // Dashboard
  private get dashboard () {
    const controller = new Controller()
    controller.id = 'EFesdpRpPO'
    controller.name = 'Dashboard'
    controller.router = 'dashboard'
    controller.classController = DashboardController
    controller.actions = []

    const get = new Action()
    get.id = '$wGTjlOCMy'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    return controller
  }

  // Extras
  private get address () {
    const controller = new Controller()
    controller.id = '$vjJOlzsKB'
    controller.name = 'Endereço'
    controller.router = 'address'
    controller.classController = AddressController
    controller.actions = []

    const get = new Action()
    get.id = 'YmQV20Lqq#'
    get.name = 'Buscar'
    get.route = ':cep'
    get.method = 'GET'
    controller.actions.push(get)

    return controller
  }

  private get options () {
    const controller = new Controller()
    controller.id = 'RapG0NW6ON'
    controller.name = 'Opções'
    controller.router = 'options'
    controller.classController = OptionsController
    controller.actions = []

    const get = new Action()
    get.id = '2CUNkDcN2m'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    return controller
  }

  // User
  private get user () {
    const controller = new Controller()
    controller.id = '5ZoR2B@yrc'
    controller.name = 'Usuário'
    controller.router = 'user'
    controller.classController = UserController
    controller.actions = []

    const get = new Action()
    get.id = 'ybpz@1#o7#'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const menus = new Action()
    menus.id = 'kdxtGvuhrb'
    menus.name = 'Menus'
    menus.route = 'menus'
    menus.method = 'GET'
    controller.actions.push(menus)

    const messaging = new Action()
    messaging.id = 'KqT195h9Ji'
    messaging.name = 'Mensageria Token'
    messaging.route = 'messaging/token'
    messaging.method = 'POST'
    controller.actions.push(messaging)

    const put = new Action()
    put.id = 'eR2ZTiJ@Mv'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const password = new Action()
    password.id = 'F96JMzSxg1'
    password.name = 'Alterar Senha'
    password.route = 'password'
    password.method = 'PUT'
    controller.actions.push(password)

    return controller
  }

  private get adminUsers () {
    const controller = new Controller()
    controller.id = 'aHPjlf5amT'
    controller.name = 'Admin Usuários'
    controller.router = 'admin/users'
    controller.classController = AdminUsersController
    controller.actions = []

    const get = new Action()
    get.id = 'vnC5hJ7iyJ'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const post = new Action()
    post.id = 'VHFq#nrwJi'
    post.name = 'Adicionar'
    post.route = null
    post.method = 'POST'
    controller.actions.push(post)

    const email = new Action()
    email.id = 'OIJlrSNWdL'
    email.name = 'Reenviar E-mail'
    email.route = null
    email.method = 'POST'
    controller.actions.push(email)

    const put = new Action()
    put.id = 'yGdVNnT08p'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const delet = new Action()
    delet.id = 'v6jn1XbEW8'
    delet.name = 'Deletar'
    delet.route = null
    delet.method = 'DELETE'
    controller.actions.push(delet)

    return controller
  }

  private get profiles () {
    const controller = new Controller()
    controller.id = 'Ws2WpAReby'
    controller.name = 'Perfis'
    controller.router = 'profiles'
    controller.classController = ProfilesController
    controller.actions = []

    const get = new Action()
    get.id = 'jTT7XznG69'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const getPermissions = new Action()
    getPermissions.id = '4pryDXI$qZ'
    getPermissions.name = 'Buscar Permissões'
    getPermissions.route = 'permissions-list'
    getPermissions.method = 'GET'
    controller.actions.push(getPermissions)

    const post = new Action()
    post.id = 'AgHxtXNXtT'
    post.name = 'Adicionar'
    post.route = null
    post.method = 'POST'
    controller.actions.push(post)

    const put = new Action()
    put.id = 'YQV#@g$fvj'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const delet = new Action()
    delet.id = 'k*yyACvF*c'
    delet.name = 'Deletar'
    delet.route = null
    delet.method = 'DELETE'
    controller.actions.push(delet)

    return controller
  }
}

const routes = new Routes()
export const controllers = routes.controllers
export const userControllers = routes.userControllers
