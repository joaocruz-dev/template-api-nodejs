import Server from './Server'
import { DataBase } from '@/Infra/DataBase/DataBase'

export default class ServerData extends Server {
  get mongodb (): boolean { return DataBase.isConnected }
}
