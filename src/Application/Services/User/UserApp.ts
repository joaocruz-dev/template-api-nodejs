import { Mapper } from '@nartc/automapper'

import { User } from '@/Domain/Entity'
import ProfileApp from '../Profile/ProfileApp'
import { UserServices } from '@/Domain/Services'
import { UserViewModel, ProfileViewModel } from '@/Api/ViewModel'

const userServices = new UserServices()

export default class UserApp {
  static async login (email: string, password: string): Promise<UserViewModel> {
    const user = await userServices.login(email, password)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfile(userView.idProfile)
    return userView
  }

  static async getSize (): Promise<number> {
    return await userServices.getSize()
  }

  static async getId (id: string): Promise<UserViewModel> {
    const user = await userServices.getId(id)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfile(userView.idProfile)
    return userView
  }

  static async getCPF (cpf: string): Promise<UserViewModel> {
    const user = await userServices.getCPF(cpf)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await getProfile(userView.idProfile)
    return userView
  }

  static async getAll (): Promise<UserViewModel[]> {
    const users = await userServices.getAll()
    const profiles = await ProfileApp.getAll()
    const usersView = Mapper.mapArray(users, UserViewModel)
    for (let i = 0; i < usersView.length; i++) {
      const idProfile = usersView[i].idProfile
      usersView[i].profile = profiles.find(profile => profile.id === idProfile)
    }
    return usersView
  }

  static async add (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.add(user)
  }

  static async register (origin: string, userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.register(origin, user)
  }

  static async confirmed (email: string, hash: string): Promise<void> {
    await userServices.confirmed(email, hash)
  }

  static async recover (origin: string, email: string): Promise<void> {
    await userServices.recover(origin, email)
  }

  static async recoverPassword (userView: UserViewModel, hash: string): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.recoverPassword(user, hash)
  }

  static async update (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.update(user)
  }

  static async updatePassword (password: string, userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.updatePassword(password, user)
  }

  static async delete (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.delete(user)
  }
}

async function getProfile (id: string): Promise<ProfileViewModel> {
  try {
    const profile = await ProfileApp.getId(id)
    return profile
  } catch (error) {
    return null
  }
}
