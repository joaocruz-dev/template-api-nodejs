import { Collection, ObjectId } from 'mongodb'
import { User } from '../../Domain/Entity'

export default class UserMigrations {
  private db: Collection
  constructor (db: Collection) { this.db = db }

  async set () {
    const users = await this.db.find().toArray()
    if (!users.length) await this.db.insertOne(this.supervisor)
  }

  private get supervisor () {
    const user = new User()
    user.name = 'Administrador'
    user.email = 'jcruzaraujoneto@outlook.com'
    user.password = '$2a$10$H6FakaI7g3fiy/AjFrsR7eOO9oPUyMHKaNmp7hoRgpRyydGMENoiW' // 12345678
    user.phone = '(66) 98156-3280'
    user.avatar = 'https://avatars2.githubusercontent.com/u/40739602'
    user.usergroup = new ObjectId('5e5be02f1a43784474b14230')
    user.status = true
    user.hashPassword = null
    user.confirmed = true
    user.hashConfirmed = null

    return user
  }
}
