import { Menu } from '@/Domain/Entity'
import { MenuRepository } from '@/Infra/Repository'

const menuRepository = new MenuRepository()

export default class MenuServices {
  static async getAll (): Promise<Menu[]> {
    return await menuRepository.getAll()
  }
}
