export abstract class Template <T extends Data, U extends Document<T>> {
  constructor (private _id: string, public documents: U[]) {}

  public get id () { return this._id }
}

export abstract class Document <T extends Data> {
  public to: string
  public data: T
}

export abstract class Data {
  public async getValue (): Promise<object> { return {} }
}
