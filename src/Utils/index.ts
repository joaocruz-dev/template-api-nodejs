import { ObjectId } from 'mongodb'

export declare type ClassType<T> = {
  new (...args: any[]): T
}

export interface ClassFunctionType<T> extends Function {
  new (...args: any[]): T
}

export type Id = string|ObjectId

export const resultMongo = (info: any, message = 'Documento não encontrado') => {
  if (!info || info.result.n !== 1) throw new Error(message)
}

export function keys<T extends object> (obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}
