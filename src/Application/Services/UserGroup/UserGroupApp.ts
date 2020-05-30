import { Mapper } from '@nartc/automapper'
import { UserGroup } from '@/Domain/Entity'
import { UserGroupServices } from '@/Domain/Services'
import { UserGroupViewModel } from '@/Api/ViewModel'

export default class UserGroupApp {
  static async getId (id: string): Promise<UserGroupViewModel> {
    const group = await UserGroupServices.getId(id)
    const groupView = Mapper.map(group, UserGroupViewModel)
    return groupView
  }

  static async getAll (): Promise<UserGroupViewModel[]> {
    const groups = await UserGroupServices.getAll()
    const groupsView = Mapper.mapArray(groups, UserGroupViewModel)
    return groupsView
  }

  static async add (groupView: UserGroupViewModel): Promise<void> {
    const group = Mapper.map(groupView, UserGroup)
    await UserGroupServices.add(group)
  }

  static async update (groupView: UserGroupViewModel): Promise<void> {
    const group = Mapper.map(groupView, UserGroup)
    await UserGroupServices.update(group)
  }

  static async delete (groupView: UserGroupViewModel): Promise<void> {
    const group = Mapper.map(groupView, UserGroup)
    await UserGroupServices.delete(group)
  }
}
