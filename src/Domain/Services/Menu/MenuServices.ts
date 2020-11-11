import { Menu } from '@/Domain/Entity'
import BaseService from '../Base/BaseService'
import { MenuRepository } from '@/Infra/Repository'

export default class MenuServices extends BaseService<Menu, MenuRepository> {
  constructor () { super(new MenuRepository()) }
}
