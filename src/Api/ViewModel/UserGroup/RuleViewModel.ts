import { AutoMap } from '@nartc/automapper'

export default class RuleViewModel {
  @AutoMap()
  public route: string

  @AutoMap()
  public actions: string[]
}
