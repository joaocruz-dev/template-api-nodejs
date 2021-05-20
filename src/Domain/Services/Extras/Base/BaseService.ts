import { FilterQuery, FindOneOptions } from 'mongodb'

import { Id } from '@/Utils'
import { BaseRepository, BaseEntity, ChangeHistory } from '@/Infra/Repository/Extras/Base/BaseRepository'

export default abstract class BaseService<T extends BaseEntity, R extends BaseRepository<T>> {
  constructor (public repository: R) {}

  async getSize (filter?: FilterQuery<T>): Promise<number> {
    return await this.repository.getSize(filter)
  }

  async getId (id: Id, options?: FindOneOptions<T extends any ? any: any>): Promise<T> {
    return await this.repository.getId(id, options)
  }

  async getAll (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    return await this.repository.getAll(filter, options)
  }

  async getIds (ids: Id[]): Promise<T[]> {
    return await this.repository.getIds(ids)
  }

  async getFilter (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    return await this.repository.getFilter(filter, options)
  }

  async getNotRemove (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    return await this.repository.getNotRemove(filter, options)
  }

  async add (data: T, changeHistory?: ChangeHistory): Promise<void> {
    await this.repository.add(data, changeHistory)
  }

  async update (data: T, changeHistory?: ChangeHistory): Promise<void> {
    await this.repository.update(data, changeHistory)
  }

  async remove (data: T, changeHistory?: ChangeHistory): Promise<void> {
    await this.repository.remove(data, changeHistory)
  }

  async delete (data: T): Promise<void> {
    await this.repository.delete(data)
  }
}
