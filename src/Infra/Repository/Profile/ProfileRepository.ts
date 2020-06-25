import { Profile } from '@/Domain/Entity'
import BaseRepository from '../Base/BaseRepository'

export default class ProfileRepository extends BaseRepository<Profile> {
  constructor () { super('profiles', Profile) }
}
