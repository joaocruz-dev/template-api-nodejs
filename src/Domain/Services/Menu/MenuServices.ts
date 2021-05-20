import { Menu } from '@/Domain/Entity'
import { MenuRepository } from '@/Infra/Repository'
import BaseService from '@/Domain/Services/Extras/Base/BaseService'

export default class MenuServices extends BaseService<Menu, MenuRepository> {
  constructor () { super(new MenuRepository()) }

  async getAllProject (): Promise<Menu[]> {
    return await this.repository.getAll()
  }
}
