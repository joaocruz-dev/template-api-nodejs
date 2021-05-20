import { ObjectId } from 'mongodb'

import { Id } from '@/Utils'
import { Profile } from '@/Domain/Entity'
import { ProfileRepository } from '@/Infra/Repository'
import BaseService from '@/Domain/Services/Extras/Base/BaseService'

export default class ProfileServices extends BaseService<Profile, ProfileRepository> {
  constructor () { super(new ProfileRepository()) }

  async addService (profile: Profile, idUser: Id): Promise<void> {
    const change = {
      change: 'Created',
      idUser: new ObjectId(idUser).toHexString()
    }
    await this.repository.add(profile, change)
  }

  async updateService (profile: Profile, idUser: Id): Promise<void> {
    const change = {
      change: 'Update',
      idUser: new ObjectId(idUser).toHexString()
    }
    await this.repository.update(profile, change)
  }

  async delete (profile: Profile): Promise<void> {
    const defaultProfiles = ['5e5be02f1a43784474b14230', '5e5be02f1a43784474b14231']
    if (defaultProfiles.includes(profile._id.toHexString())) throw new Error('Este Perfil não pode ser excluído')

    await this.repository.delete(profile)
  }
}
