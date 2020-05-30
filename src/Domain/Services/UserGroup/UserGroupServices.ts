import { UserGroupRepository } from '@/Infra/Repository'
import { UserGroup } from '@/Domain/Entity'
import { Id } from '@/Utils'

const groupRepository = new UserGroupRepository()

export default class UserGroupServices {
  static async getId (id: Id): Promise<UserGroup> {
    return await groupRepository.getId(id)
  }

  static async getAll (): Promise<UserGroup[]> {
    return await groupRepository.getAll()
  }

  static async add (group: UserGroup): Promise<void> {
    await groupRepository.add(group)
  }

  static async update (group: UserGroup): Promise<void> {
    await groupRepository.update(group)
  }

  static async delete (group: UserGroup): Promise<void> {
    await groupRepository.delete(group._id)
  }
}
