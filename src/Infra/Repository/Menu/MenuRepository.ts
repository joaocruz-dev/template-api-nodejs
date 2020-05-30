import BaseRepository from '../Base/BaseRepository'
import { Menu } from '@/Domain/Entity'

export default class MenuRepository extends BaseRepository<Menu> {
  constructor () { super('menus', Menu) }
}
