import { Template, Document, Data } from '../Models'

export class TError extends Template <TErrorData, Document<TErrorData>> {
  constructor () { super('template-key', []) }
}

export class TErrorData extends Data {
  constructor () {
    super()
  }

  async getValue (): Promise<object> {
    return {}
  }
}
