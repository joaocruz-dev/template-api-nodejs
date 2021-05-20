import { AutoMap } from '@nartc/automapper'
import { plainToClass } from 'class-transformer'
import { ObjectId, Collection, FilterQuery, FindOneOptions } from 'mongodb'

import { ClassType, Id, keys, resultMongo } from '@/Utils'
import { DataBase, Collections } from '@/Infra/DataBase/DataBase'

export abstract class BaseRepository<T extends BaseEntity> {
  public db = DataBase

  constructor (
    private Entity: ClassType<T>,
    private collectionName: keyof Collections
  ) {}

  public get collection (): Collection {
    return this.db.collections[this.collectionName]
  }

  async getSize (filter?: FilterQuery<T>): Promise<number> {
    const size = await this.collection.countDocuments(filter)
    return size
  }

  async getId (id: Id, options?: FindOneOptions<T extends any ? any: any>): Promise<T> {
    const filter = <T>{ _id: new ObjectId(id) }
    const data = await this.collection.findOne<T>(filter, options)
    return data ? plainToClass(this.Entity, data) : null
  }

  async getAll (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    let datas = await this.collection.find<T>(filter, options).sort({ _id: 1 }).toArray()
    datas = plainToClass(this.Entity, datas)
    return datas
  }

  async getIds (ids: Id[]): Promise<T[]> {
    let _ids = ids.map(x => new ObjectId(x))
    _ids = _ids.filter((x, i) => _ids.findIndex(y => y.toHexString() === x.toHexString()) === i)
    const filter = <FilterQuery<T>>{
      _id: { $in: _ids }
    }
    return await this.getAll(filter)
  }

  async getFilter (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    if (!filter) filter = {}
    const _filter = <FilterQuery<T>>{
      ...filter,
      status: { $in: [true, null] },
      remove: { $in: [false, null] }
    }
    return await this.getAll(_filter, options)
  }

  async getNotRemove (filter?: FilterQuery<T>, options?: FindOneOptions<T extends any ? any: any>): Promise<T[]> {
    if (!filter) filter = {}
    const _filter = <FilterQuery<T>>{
      ...filter,
      remove: false
    }
    return await this.getAll(_filter, options)
  }

  async add (data: T, changeHistory?: ChangeHistory): Promise<void> {
    if (keys(data).find(x => x === 'remove')) data.remove = false
    if (keys(data).find(x => x === 'changeHistory')) {
      data.changeHistory = []
      if (changeHistory) {
        changeHistory.date = new Date().toISOString()
        data.changeHistory.push(changeHistory)
      }
    }

    if (!ObjectId.isValid(data._id)) delete data._id
    const info = await this.collection.insertOne(data)
    resultMongo(info, 'Documento não adicionado')
  }

  async update (data: T, changeHistory?: ChangeHistory): Promise<void> {
    let push: any = null
    const filter = <T>{ _id: new ObjectId(data._id) }

    if (keys(data).find(x => x === 'changeHistory')) {
      delete data.changeHistory
      if (changeHistory) {
        push = {}
        changeHistory.date = new Date().toISOString()
        push.changeHistory = changeHistory
      }
    }

    delete data._id

    const update: any = { $set: data }
    if (push) update.$push = push

    const info = await this.collection.updateOne(filter, update)
    resultMongo(info, 'Documento não atualizado')
  }

  async remove (data: T, changeHistory?: ChangeHistory): Promise<void> {
    const id = data._id

    const _data = new this.Entity()
    _data._id = id
    _data.remove = true
    if (keys(data).find(x => x === 'changeHistory')) _data.changeHistory = null

    await this.update(_data, changeHistory)
  }

  async delete (data: T): Promise<void> {
    const filter = <T>{ _id: new ObjectId(data._id) }
    const info = await this.collection.deleteOne(filter)
    resultMongo(info)
  }
}

export class ChangeHistory {
  @AutoMap()
  public date?: string

  @AutoMap()
  public idUser: string

  @AutoMap()
  public change: string
}

export interface BaseEntity {
  _id: ObjectId
  remove?: boolean
  changeHistory?: ChangeHistory[]
}
