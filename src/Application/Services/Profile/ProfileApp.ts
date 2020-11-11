import { Mapper } from '@nartc/automapper'

import { Profile } from '@/Domain/Entity'
import { ProfileViewModel } from '@/Api/ViewModel'
import { ProfileServices } from '@/Domain/Services'

const profileServices = new ProfileServices()

export default class ProfileApp {
  static async getId (id: string): Promise<ProfileViewModel> {
    const profile = await profileServices.getId(id)
    const profileView = Mapper.map(profile, ProfileViewModel)
    return profileView
  }

  static async getAll (): Promise<ProfileViewModel[]> {
    const profiles = await profileServices.getAll()
    const profilesView = Mapper.mapArray(profiles, ProfileViewModel)
    return profilesView
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
