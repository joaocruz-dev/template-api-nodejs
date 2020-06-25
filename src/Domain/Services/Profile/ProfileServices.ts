import { Id } from '@/Utils'
import { Profile } from '@/Domain/Entity'
import { ProfileRepository } from '@/Infra/Repository'

const profileRepository = new ProfileRepository()

export default class ProfileServices {
  static async getId (id: Id): Promise<Profile> {
    return await profileRepository.getId(id)
  }

  static async getAll (): Promise<Profile[]> {
    return await profileRepository.getAll()
  }

  static async add (profile: Profile): Promise<void> {
    await profileRepository.add(profile)
  }

  static async update (profile: Profile): Promise<void> {
    await profileRepository.update(profile)
  }

  static async delete (profile: Profile): Promise<void> {
    const id = profile._id.toHexString()
    if (
      id === '5e5be02f1a43784474b14230' ||
      id === '5e5be02f1a43784474b14231'
    ) throw new Error('Este Perfil não pode ser excluído')
    await profileRepository.delete(profile._id)
  }
}
