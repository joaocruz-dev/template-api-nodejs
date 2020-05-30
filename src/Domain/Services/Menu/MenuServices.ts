import { MenuRepository } from '@/Infra/Repository'
import { Menu } from '@/Domain/Entity'

const menuRepository = new MenuRepository()

export default class MenuServices {
  static async getAll (): Promise<Menu[]> {
    return await menuRepository.getAll()
  }
}
