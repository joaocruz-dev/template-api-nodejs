import { Mapper } from '@nartc/automapper'

import { User } from '@/Domain/Entity'
import { UserServices, ProfileServices } from '@/Domain/Services'
import { UserViewModel, ProfileViewModel } from '@/Api/ViewModel'

export default class UserApp {
  static async login (email: string, password: string): Promise<UserViewModel> {
    const user = await UserServices.login(email, password)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfileView(userView.idProfile)
    return userView
  }

  static async getId (id: string): Promise<UserViewModel> {
    const user = await UserServices.getId(id)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfileView(userView.idProfile)
    return userView
  }

  static async getCPF (cpf: string): Promise<UserViewModel> {
    const user = await UserServices.getCPF(cpf)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfileView(userView.idProfile)
    return userView
  }

  static async getAll (): Promise<UserViewModel[]> {
    const users = await UserServices.getAll()
    const usersView = Mapper.mapArray(users, UserViewModel)
    for (const i in usersView) {
      usersView[i].profile = await getProfileView(usersView[i].idProfile)
    }
    return usersView
  }

  static async add (origin: string, userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.add(origin, user)
  }

  static async register (origin: string, userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.register(origin, user)
  }

  static async confirmed (email: string, hash: string): Promise<void> {
    await UserServices.confirmed(email, hash)
  }

  static async recover (origin: string, email: string): Promise<void> {
    await UserServices.recover(origin, email)
  }

  static async recoverPassword (userView: UserViewModel, hash: string): Promise<void> {
    const user = Mapper.map(userView, User)
    await UserServices.recoverPassword(user, hash)
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

async function getProfileView (id: string): Promise<ProfileViewModel> {
  try {
    const profile = await ProfileServices.getId(id)
    return Mapper.map(profile, ProfileViewModel)
  } catch (error) {
    return new ProfileViewModel()
  }
}
