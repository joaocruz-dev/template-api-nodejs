import { Mapper } from '@nartc/automapper'
import { UserServices, UserGroupServices } from '@/Domain/Services'
import { UserViewModel, UserGroupViewModel } from '@/Api/ViewModel'
import { User } from '@/Domain/Entity'

export default class UserApp {
  static login (email: string, password: string) {
    return UserServices.login(email, password)
  }

  static async getId (id: string): Promise<UserViewModel> {
    const user = await UserServices.getId(id)
    const userView = Mapper.map(user, UserViewModel)
    userView.usergroupViewModel = await getGroupView(userView.usergroup)
    return userView
  }

  static async getAll (): Promise<UserViewModel[]> {
    const users = await UserServices.getAll()
    const usersView = Mapper.mapArray(users, UserViewModel)
    for (const i in usersView) {
      usersView[i].usergroupViewModel = await getGroupView(usersView[i].usergroup)
    }
    return usersView
  }

  static async add (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.add(user)
  }

  static async update (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.update(user)
  }

  static async updatePassword (password: string, userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.updatePassword(password, user)
  }

  static async delete (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.delete(user)
  }
}

async function getGroupView (id: string): Promise<UserGroupViewModel> {
  try {
    const group = await UserGroupServices.getId(id)
    return Mapper.map(group, UserGroupViewModel)
  } catch (error) {
    return new UserGroupViewModel()
  }
}
