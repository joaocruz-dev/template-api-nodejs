import { Controller, Action, GroupController } from './Controller'

import AddressController from '../Address/AddressController'
import DashboardController from '../Dashboard/DashboardController'
import OptionsController from '../Options/OptionsController'
import ProfilesController from '../Profiles/ProfilesController'
import UserController from '../User/UserController'
import UsersController from '../Users/UsersController'

class Routes {
  public get controllers () {
    const controllers: Controller[] = []

    controllers.push(this.address)
    controllers.push(this.dashboard)
    controllers.push(this.options)
    controllers.push(this.profiles)
    controllers.push(this.user)
    controllers.push(this.users)

    return controllers
  }

  public get userControllers () {
    const list: GroupController[] = []

    const administration = new GroupController()
    administration.name = 'Administração'
    administration.icon = 'las la-user-shield'
    administration.controllers = [this.users, this.profiles]
    list.push(administration)

    return publicControllers(list)
  }

  private get address () {
    const controller = new Controller()
    controller.id = 'PoMIMJUUtQ'
    controller.name = 'Endereço'
    controller.router = 'address'
    controller.classController = AddressController
    controller.actions = []

    const get = new Action()
    get.id = 'DZMkir9I80'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    return controller
  }

  private get dashboard () {
    const controller = new Controller()
    controller.id = 'sbK9joAF0P'
    controller.name = 'Dashboard'
    controller.router = 'dashboard'
    controller.classController = DashboardController
    controller.actions = []

    const get = new Action()
    get.id = '5j3UzwwUNp'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    return controller
  }

  private get options () {
    const controller = new Controller()
    controller.id = 'fVLNQtFeSy'
    controller.name = 'Opções'
    controller.router = 'options'
    controller.classController = OptionsController
    controller.actions = []

    const get = new Action()
    get.id = 'tpVAy90Ws0'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

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
    get.id = 'N5A4CSsCSc'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const getPermissions = new Action()
    getPermissions.id = 'e8b4CSsCCe'
    getPermissions.name = 'Buscar Permissões'
    getPermissions.route = 'permissions-list'
    getPermissions.method = 'GET'
    controller.actions.push(getPermissions)

    const post = new Action()
    post.id = 'qTRr83S8mj'
    post.name = 'Adicionar'
    post.route = null
    post.method = 'POST'
    controller.actions.push(post)

    const put = new Action()
    put.id = '7Pq8Ei6myr'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const delet = new Action()
    delet.id = 'Qfmk766uNQ'
    delet.name = 'Deletar'
    delet.route = null
    delet.method = 'DELETE'
    controller.actions.push(delet)

    return controller
  }

  private get user () {
    const controller = new Controller()
    controller.id = 'lFSfYSrNkQ'
    controller.name = 'Usuário'
    controller.router = 'user'
    controller.classController = UserController
    controller.actions = []

    const get = new Action()
    get.id = 'DimqZritcg'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const menus = new Action()
    menus.id = 'R2It9FK0yL'
    menus.name = 'Menus'
    menus.route = 'menus'
    menus.method = 'GET'
    controller.actions.push(menus)

    const put = new Action()
    put.id = 'YojNf17PPR'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const putPassword = new Action()
    putPassword.id = 'QZWBAJuJqj'
    putPassword.name = 'Alterar Senha'
    putPassword.route = 'password'
    putPassword.method = 'PUT'
    controller.actions.push(putPassword)

    return controller
  }

  private get users () {
    const controller = new Controller()
    controller.id = 'TF2WbNN1li'
    controller.name = 'Usuários'
    controller.router = 'users'
    controller.classController = UsersController
    controller.actions = []

    const get = new Action()
    get.id = 'E8MsLhlygx'
    get.name = 'Visualizar'
    get.route = null
    get.method = 'GET'
    controller.actions.push(get)

    const post = new Action()
    post.id = 'A0mzpugNzV'
    post.name = 'Adicionar'
    post.route = null
    post.method = 'POST'
    controller.actions.push(post)

    const put = new Action()
    put.id = 'xoSDaDnqDv'
    put.name = 'Editar'
    put.route = null
    put.method = 'PUT'
    controller.actions.push(put)

    const delet = new Action()
    delet.id = 'QDyjwEjtsH'
    delet.name = 'Deletar'
    delet.route = null
    delet.method = 'DELETE'
    controller.actions.push(delet)

    return controller
  }
}

function publicControllers (controllers: GroupController[]) {
  return controllers
    .map(permission => {
      permission.controllers = permission.controllers.map(controller => {
        delete controller.router
        controller.actions.map(action => {
          delete action.route
          delete action.method
          return action
        })
        return controller
      })
      return permission
    })
}

const routes = new Routes()

const controllers = routes.controllers
const userControllers = routes.userControllers

export { controllers, userControllers }
