import { name, version } from '@/../package.json'
import { DataBase } from '@/Infra/DataBase/DataBase'

const SANDBOX = false

export default class ServerData {
  get name (): string { return name.split('.')[0] }

  get version (): string { return version }

  get isSandBox (): boolean { return SANDBOX }

  get mongodb (): boolean { return DataBase.isConnected }

  get isProduction (): boolean { return this.environment === 'production' }

  get isDevelopment (): boolean { return this.environment === 'development' }

  get environment (): string { return this.isSandBox ? 'sandbox' : process.env.NODE_ENV }

  get view (): string {
    switch (this.environment) {
      case 'production':
        return `https://${this.name}.com`

      case 'sandbox':
        return `https://sandbox.${this.name}.com`

      default:
        return 'http://localhost:8080'
    }
  }

  get server (): string {
    switch (this.environment) {
      case 'production':
        return `https://api.${this.name}.com/api`

      case 'sandbox':
        return `https://api.sandbox.${this.name}.com/api`

      default:
        return 'http://localhost:3000/api'
    }
  }
}
