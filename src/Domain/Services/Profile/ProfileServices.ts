import { Profile } from '@/Domain/Entity'
import BaseService from '../Base/BaseService'
import { Id } from '@/Utils'
import { ObjectId } from 'mongodb'

import { ProfileRepository } from '@/Infra/Repository'

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
    const id = profile._id.toHexString()
    const defaultProfiles = ['5e5be02f1a43784474b14230', '5e5be02f1a43784474b14231']
    if (defaultProfiles.includes(id)) throw new Error('Este Perfil não pode ser excluído')
    await this.repository.delete(profile)
  }
}
