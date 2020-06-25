import { MongoClient, Db, Collection } from 'mongodb'

import { name } from '@/../package.json'
import { MenusMigrations, ProfilesMigrations, UserMigrations } from '../Migrations'

class DbContext {
  private _db: Db
  private dbName = name.split('.')[0]
  private client = new MongoClient(this.connection, { useUnifiedTopology: true })

  async connect () {
    console.log('====================================')
    console.log('Trying to connect to the MongoDb...')
    console.log('====================================')
    this.client.connect(async (err, client) => {
      if (err) return console.log(err)
      console.log('Connected to the MongoDb')
      this._db = client.db(this.dbName)

      const db = new DataBase()
      const userMigrations = new UserMigrations(db.users)
      const menusMigrations = new MenusMigrations(db.menus)
      const profilesMigrations = new ProfilesMigrations(db.profiles)
      await userMigrations.set()
      await menusMigrations.set()
      await profilesMigrations.set()
    })
  }

  private get connection (): string {
    if (!process.env.PROD === true) return 'mongodb://localhost:27017'
    return 'url_mongodb_production'
  }

  public get db () { return this._db }

  public get isConnected () { return this.client.isConnected() }
}

export const dbContext = new DbContext()

export class DataBase {
  public get settings (): Collection {
    return dbContext.db.collection('Settings')
  }

  public get menus (): Collection {
    return dbContext.db.collection('Menus')
  }

  public get users (): Collection {
    return dbContext.db.collection('Users')
  }

  public get profiles (): Collection {
    return dbContext.db.collection('Profiles')
  }
}
