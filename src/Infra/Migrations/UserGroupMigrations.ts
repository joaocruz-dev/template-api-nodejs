import { Collection, ObjectId } from 'mongodb'
import { UserGroup } from '@/Domain/Entity'

export default class UserGroupMigrations {
  private db: Collection
  constructor (db: Collection) { this.db = db }

  async set () {
    const groups = await this.db.find().toArray()
    if (!groups.length) {
      groups.push(this.administrador)
      groups.push(this.usuario)
      groups.push(this.suporte)
      await this.db.insertMany(groups)
    }
  }

  private get administrador () {
    const group = new UserGroup()
    group._id = new ObjectId('5e5be02f1a43784474b14230')
    group.name = 'Administrador'
    group.level = 1
    group.status = true
    group.rules = null

    return group
  }

  private get suporte () {
    const group = new UserGroup()
    group.name = 'Suporte'
    group.level = 2
    group.status = true
    group.rules = null

    return group
  }

  private get usuario () {
    const group = new UserGroup()
    group._id = new ObjectId('5e5be02f1a43784474b14231')
    group.name = 'Usuário'
    group.level = 3
    group.status = true
    group.rules = null

    return group
  }
}
