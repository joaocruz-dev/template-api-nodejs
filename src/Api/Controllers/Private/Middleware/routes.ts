import { ClassFunctionType } from '@/Utils'
import AddressController from '../Address/AddressController'
import DashboardController from '../Dashboard/DashboardController'
import OptionsController from '../Options/OptionsController'
import UserController from '../User/UserController'
import UserGroupsController from '../UserGroups/UserGroupsController'
import UsersController from '../Users/UsersController'

export interface Route {
  name: string,
  group?: string,
  path: string,
  controller: ClassFunctionType<any>
}

export const routes: Route[] = [
  { name: 'Endereço', path: 'address', controller: AddressController },
  { name: 'Dashboard', path: 'dashboard', controller: DashboardController },
  { name: 'Opções', path: 'options', controller: OptionsController },
  { name: 'Usuário', path: 'user', controller: UserController },
  { name: 'Grupo de Usuários', group: 'Administração', path: 'usergroups', controller: UserGroupsController },
  { name: 'Usuários', group: 'Administração', path: 'users', controller: UsersController }
]

// Array Controllers
const controllers: ClassFunctionType<any>[] = routes.map(route => route.controller)

// Paths AuthMiddleware
const stringRoutes = routes.map(route => route.path)

export { controllers, stringRoutes }
