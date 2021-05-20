import { _Error } from '@/Domain/Entity'
import { BaseRepository } from '../Base/BaseRepository'

export default class ErrorRepository extends BaseRepository<_Error> {
  constructor () { super(_Error, 'errors') }
}
