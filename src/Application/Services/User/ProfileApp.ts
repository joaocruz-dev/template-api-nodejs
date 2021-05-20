import { Mapper } from '@nartc/automapper'

import { Profile } from '@/Domain/Entity'
import { ProfileViewModel } from '@/Api/ViewModel'
import { ProfileServices } from '@/Domain/Services'

const profileServices = new ProfileServices()

export default class ProfileApp {
  static async getId (id: string): Promise<ProfileViewModel> {
    const profile = await profileServices.getId(id)
    return profile ? Mapper.map(profile, ProfileViewModel) : null
  }

  static async getAll (): Promise<ProfileViewModel[]> {
    const profiles = await profileServices.getAll()
    return Mapper.mapArray(profiles, ProfileViewModel)
  }

  static async getIds (ids: string[]): Promise<ProfileViewModel[]> {
    const profiles = await profileServices.getIds(ids)
    return Mapper.mapArray(profiles, ProfileViewModel)
  }

  static async add (profileView: ProfileViewModel, idUser: string): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await profileServices.addService(profile, idUser)
  }

  static async update (profileView: ProfileViewModel, idUser: string): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await profileServices.updateService(profile, idUser)
  }

  static async delete (profileView: ProfileViewModel): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await profileServices.delete(profile)
  }
}
