import { plainToClass } from 'class-transformer'
import { ObjectId } from 'mongodb'

import { dbContext, DataBase } from '@/Infra/DataBase/DbContext'
import { ClassType, Id, keys, resultMongo } from '@/Utils'

const dataBase = new DataBase()

declare interface id {
  _id: ObjectId
}

declare interface base {
  _id: ObjectId
  userUpdate?: ObjectId
  userCreated?: ObjectId
  dateUpdate?: string
  dateCreated?: string
}

export default class BaseRepository<T extends base> {
  private dbName: keyof DataBase
  private cls: ClassType<T>

  constructor (dbName: keyof DataBase, cls: ClassType<T>) {
    this.dbName = dbName
    this.cls = cls
  }

  get db (): DataBase {
    return dataBase
  }

  static get isConnected (): boolean {
    return dbContext.isConnected
  }

  async getId (id: Id, projection?: object): Promise<T> {
    const filter = { _id: new ObjectId(id) }
    let data = await this.db[this.dbName].findOne(filter, { projection })
    if (!data) resultMongo(false)
    data = plainToClass(this.cls, data)
    return data
  }

  async getAll (filter?: object, projection?: object): Promise<T[]> {
    let datas = await this.db[this.dbName].find(filter, { projection }).toArray()
    datas = plainToClass(this.cls, datas)
    return datas
  }

  async add (data: T, userCreated?: Id): Promise<void> {
    if (keys(data).find(key => key === 'userUpdate')) data.userUpdate = null
    if (keys(data).find(key => key === 'userCreated')) data.userCreated = userCreated ? new ObjectId(userCreated) : null
    if (keys(data).find(key => key === 'dateUpdate')) data.dateUpdate = null
    if (keys(data).find(key => key === 'dateCreated')) data.dateCreated = new Date().toISOString()
    delete data._id
    const info = await this.db[this.dbName].insertOne(data)
    resultMongo(info, 'Documento não adicionado')
  }

  async update (data: T, userUpdate?: Id): Promise<void> {
    const filter = { _id: new ObjectId(data._id) }
    if (keys(data).find(key => key === 'userUpdate')) data.userUpdate = userUpdate ? new ObjectId(userUpdate) : null
    if (keys(data).find(key => key === 'userCreated')) delete data.userCreated
    if (keys(data).find(key => key === 'dateUpdate')) data.dateUpdate = new Date().toISOString()
    if (keys(data).find(key => key === 'dateCreated')) delete data.dateCreated
    delete data._id
    const info = await this.db[this.dbName].updateOne(filter, {
      $set: data
    })
    resultMongo(info)
  }

  async delete (id: Id): Promise<void> {
    const filter = { _id: new ObjectId(id) }
    const info = await this.db[this.dbName].deleteOne(filter)
    resultMongo(info)
  }

  async getIdElementArray<U extends id> (fieldName: keyof T, cls: ClassType<U>, idData: Id, idElement: Id): Promise<U> {
    const filter = { _id: new ObjectId(idData) }
    const projection: any = { _id: false }
    projection[fieldName] = { $elemMatch: { _id: new ObjectId(idElement) } }
    const dataElement = await this.db[this.dbName].findOne(filter, { projection })
    if (!dataElement || !dataElement[fieldName]) resultMongo(false)
    let element = dataElement[fieldName][0]
    element = plainToClass(cls, element)
    return element
  }

  async getAllElementArray<U extends id> (fieldName: keyof T, cls: ClassType<U>, idData: Id, filterArray?: object): Promise<U[]> {
    const filter = { _id: new ObjectId(idData) }
    const projection: any = { _id: false }
    projection[fieldName] = filterArray ? { $elemMatch: filterArray } : true
    const dataElements = await this.db[this.dbName].findOne(filter, { projection })
    if (!dataElements) resultMongo(false)
    let elements = dataElements[fieldName]
    elements = plainToClass(cls, elements)
    return elements
  }

  async addElementArray<U extends id> (fieldName: keyof T, idData: Id, element: U): Promise<void> {
    const filter = { _id: new ObjectId(idData) }
    element._id = new ObjectId()
    const $push: any = {}
    $push[fieldName] = element
    const info = await this.db[this.dbName].updateOne(filter, { $push })
    resultMongo(info)
  }

  async editElementArray<U extends id> (fieldName: keyof T, cls: ClassType<U>, idData: Id, element: U): Promise<void> {
    const filter = { _id: new ObjectId(idData) }
    const id = new ObjectId(element._id)
    const baseRepository = new BaseRepository<T>(this.dbName, this.cls)
    const _element = await baseRepository.getIdElementArray<U>(fieldName, cls, idData, id)
    element = {
      ..._element,
      ...element
    }
    element._id = _element._id
    const $set: any = {}
    $set[`${fieldName}.$[i]`] = element
    const info = await this.db[this.dbName].updateOne(filter, { $set }, {
      arrayFilters: [
        { 'i._id': id }
      ]
    })
    resultMongo(info)
  }

  async deleteElementArray<U extends id> (fieldName: keyof T, idData: Id, element: U): Promise<void> {
    const filter = { _id: new ObjectId(idData) }
    const id = new ObjectId(element._id)
    const $pull: any = {}
    $pull[fieldName] = { _id: id }
    const info = await this.db[this.dbName].updateOne(filter, { $pull })
    resultMongo(info)
  }
}
