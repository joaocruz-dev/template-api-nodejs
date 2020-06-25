import { Mapper } from '@nartc/automapper'

import { Profile } from '@/Domain/Entity'
import { ProfileViewModel } from '@/Api/ViewModel'
import { ProfileServices } from '@/Domain/Services'

export default class ProfileApp {
  static async getId (id: string): Promise<ProfileViewModel> {
    const profile = await ProfileServices.getId(id)
    const profileView = Mapper.map(profile, ProfileViewModel)
    return profileView
  }

  static async getAll (): Promise<ProfileViewModel[]> {
    const profiles = await ProfileServices.getAll()
    const profilesView = Mapper.mapArray(profiles, ProfileViewModel)
    return profilesView
  }

  static async add (profileView: ProfileViewModel): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await ProfileServices.add(profile)
  }

  static async update (profileView: ProfileViewModel): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await ProfileServices.update(profile)
  }

  static async delete (profileView: ProfileViewModel): Promise<void> {
    const profile = Mapper.map(profileView, Profile)
    await ProfileServices.delete(profile)
  }
}
