import BaseRepository from '../Base/BaseRepository'
import { UserGroup } from '@/Domain/Entity'

export default class UserGroupRepository extends BaseRepository<UserGroup> {
  constructor () { super('userGroups', UserGroup) }
}
