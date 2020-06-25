import { Menu } from '@/Domain/Entity'
import BaseRepository from '../Base/BaseRepository'

export default class MenuRepository extends BaseRepository<Menu> {
  constructor () { super('menus', Menu) }
}
