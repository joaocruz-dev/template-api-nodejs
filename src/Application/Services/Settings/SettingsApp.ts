import { SettingsServices } from '@/Domain/Services'

export default class SettingsApp {
  static get isConnected () {
    return SettingsServices.isConnected
  }
}
