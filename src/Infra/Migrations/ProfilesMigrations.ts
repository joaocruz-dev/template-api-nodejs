import { ObjectId } from 'mongodb'

import { Profile } from '@/Domain/Entity'
import { ProfileServices } from '@/Domain/Services'

export default class ProfilesMigrations {
  constructor (
    private profileServices = new ProfileServices()
  ) {}

  async set () {
    const count = await this.profileServices.getSize()
    if (count) return

    await this.profileServices.add(this.administrador)
    await this.profileServices.add(this.usuario)
  }

  private get administrador () {
    const group = new Profile()
    group._id = new ObjectId('5e5be02f1a43784474b14230')
    group.name = 'Administrador'
    group.level = 1
    group.isRoot = true
    group.status = true
    group.permissions = null
    group.changeHistory = []

    return group
  }

  private get usuario () {
    const group = new Profile()
    group._id = new ObjectId('5e5be02f1a43784474b14231')
    group.name = 'Usuário'
    group.level = 3
    group.isRoot = false
    group.status = true
    group.permissions = null
    group.changeHistory = []

    return group
  }
}
