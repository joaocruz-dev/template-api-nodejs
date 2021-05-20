import { Mapper } from '@nartc/automapper'

import ProfileApp from './ProfileApp'
import { User } from '@/Domain/Entity'
import { UserViewModel } from '@/Api/ViewModel'
import { UserServices } from '@/Domain/Services'

const userServices = new UserServices()

export default class UserApp {
  static async login (email: string, password: string): Promise<UserViewModel> {
    const user = await userServices.login(email, password)
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await ProfileApp.getId(userView.idProfile)
    return userView
  }

  static async getSize (): Promise<number> {
    return await userServices.getSize()
  }

  static async getId (id: string): Promise<UserViewModel> {
    const user = await userServices.getId(id)
    if (!user) return null
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await ProfileApp.getId(userView.idProfile)
    return userView
  }

  static async getIds (ids: string[]): Promise<UserViewModel[]> {
    const users = await userServices.getIds(ids)
    const usersView = Mapper.mapArray(users, UserViewModel)
    const profiles = await ProfileApp.getIds(usersView.map(x => x.idProfile))
    return usersView.map(x => {
      x.profile = profiles.find(y => y.id === x.idProfile)
      return x
    })
  }

  static async getEmail (email: string): Promise<UserViewModel> {
    const user = await userServices.getEmail(email)
    if (!user) return null
    const userView = Mapper.map(user, UserViewModel)
    userView.profile = await ProfileApp.getId(userView.idProfile)
    return userView
  }

  static async getAll (): Promise<UserViewModel[]> {
    const users = await userServices.getAll()
    const usersView = Mapper.mapArray(users, UserViewModel)
    const profiles = await ProfileApp.getIds(usersView.map(x => x.idProfile))
    return usersView.map(x => {
      x.profile = profiles.find(y => y.id === x.idProfile)
      return x
    })
  }

  static async add (userView: UserViewModel, sendEmail?: boolean): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.addService(user, sendEmail)
  }

  static async sendEmail (idUser: string): Promise<void> {
    await userServices.sendEmail(idUser)
  }

  static async addMessagingToken (idUser: string, token: string): Promise<void> {
    await userServices.addMessagingToken(idUser, token)
  }

  static async infoRegistrated (email: string, hash: string): Promise<UserViewModel | any> {
    const user = await userServices.infoRegistrated(email, hash)
    return user.confirmed ? user : Mapper.map(user, UserViewModel)
  }

  static async registrated (userView: UserViewModel, hash: string): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.registrated(user, hash)
  }

  static async recover (email: string): Promise<void> {
    await userServices.recover(email)
  }

  static async updatePassword (userView: UserViewModel, hash: string): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.updatePassword(user, hash)
  }

  static async update (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.update(user)
  }

  static async delete (userView: UserViewModel): Promise<void> {
    const user = Mapper.map(userView, User)
    await userServices.delete(user)
  }
}
