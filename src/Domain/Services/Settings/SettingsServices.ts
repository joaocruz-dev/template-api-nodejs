import { SettingsRepository } from '@/Infra/Repository'

// const settingsRepository = new SettingsRepository()

export default class SettingsServices {
  static get isConnected () {
    return SettingsRepository.isConnected
  }
}
