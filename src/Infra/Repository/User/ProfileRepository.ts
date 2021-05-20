import { Profile } from '@/Domain/Entity'
import { BaseRepository } from '@/Infra/Repository/Extras/Base/BaseRepository'

export default class ProfileRepository extends BaseRepository<Profile> {
  constructor () { super(Profile, 'profiles') }
}
