import { Collection, ObjectId } from 'mongodb'

import { Profile } from '@/Domain/Entity'

export default class ProfilesMigrations {
  constructor (private collection: Collection) {}

  async set () {
    const profiles = await this.collection.find().toArray()
    if (profiles.length) return

    profiles.push(this.administrador)
    profiles.push(this.usuario)
    profiles.push(this.suporte)
    await this.collection.insertMany(profiles)
  }

  private get administrador () {
    const group = new Profile()
    group._id = new ObjectId('5e5be02f1a43784474b14230')
    group.name = 'Administrador'
    group.level = 1
    group.status = true
    group.permissions = null

    return group
  }

  private get usuario () {
    const group = new Profile()
    group._id = new ObjectId('5e5be02f1a43784474b14231')
    group.name = 'Usuário'
    group.level = 3
    group.status = true
    group.permissions = null

    return group
  }

  private get suporte () {
    const group = new Profile()
    group.name = 'Suporte'
    group.level = 2
    group.status = true
    group.permissions = null

    return group
  }
}
