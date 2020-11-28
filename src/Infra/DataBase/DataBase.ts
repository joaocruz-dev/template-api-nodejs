import { MongoClient, Db, Collection } from 'mongodb'

import OpMigration from '../Migrations'
import ServerData from '@/Api/Functions/Server/ServerData'

const server = new ServerData()

class _DataBase {
  private _db: Db
  private _collections: Collections
  private dbName = server.name
  private client = new MongoClient(this.connection, { useUnifiedTopology: true })

  async connect () {
    console.log('====================================')
    console.log('Trying to connect to the MongoDb...')
    console.log('====================================')
    this.client.connect(async (err, client) => {
      if (err) return console.log(err)
      console.log('Connected to the MongoDb')
      this._db = client.db(this.dbName)
      this._collections = new Collections(this.db)

      await OpMigration(this.collections)
    })
  }

  private get connection (): string {
    switch (server.environment) {
      case 'production':
        return 'url_mongodb_production'

      case 'sandbox':
        return 'url_mongodb_sandbox'

      default:
        return 'mongodb://localhost:27017'
    }
  }

  public get db () { return this._db }

  public get collections () { return this._collections }

  public get isConnected () { return this.client.isConnected() }
}

class Collections {
  constructor (private db: Db) {}

  public get menus (): Collection {
    return this.db.collection('Menus')
  }

  public get profiles (): Collection {
    return this.db.collection('Profiles')
  }

  public get settings (): Collection {
    return this.db.collection('Settings')
  }

  public get users (): Collection {
    return this.db.collection('Users')
  }
}

const DataBase = new _DataBase()

export { DataBase, Collections }
