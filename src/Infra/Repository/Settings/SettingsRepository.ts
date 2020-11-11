import { BaseRepository } from '../Base/BaseRepository'

class Settings {}

export default class SettingsRepository extends BaseRepository<any> {
  constructor () { super(Settings, 'settings') }
}
