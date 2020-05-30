import { AutoMap } from '@nartc/automapper'

export default class Rule {
  @AutoMap()
  public route: string

  /*
    view   - Visualizar
    add    - Adicionar
    update - Alterar
    delete - Deletar
  */
  @AutoMap()
  public actions: string[]
}
