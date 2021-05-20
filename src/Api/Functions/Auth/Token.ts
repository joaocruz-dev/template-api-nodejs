import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import ServerData from '@/Api/Functions/Server/ServerData'

const server = new ServerData()
let secret = '@FZHij*eAWUbIrx097keXY*rb&Xdmh7qp35388WfPfQ4V8*2*w'

if (server.isProduction) secret = randomString(2048)

export default class Token {
  static sign (data: object, time = 3600) {
    return jwt.sign(data, secret, {
      expiresIn: time
    })
  }

  static verify (token: string) {
    try {
      const decoded = jwt.verify(token, secret)
      return decoded
    } catch (err) {
      throw new Error('Token inválido')
    }
  }

  static comparePass (origin: string, value: string): boolean {
    return bcrypt.compareSync(value, origin)
  }

  static newPass (value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  static randomString (length = 10): string {
    return randomString(length)
  }
}

function randomString (length = 10): string {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@$%&'
  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}

// for (let i = 0; i < 5; i++) {
//   console.log(randomString(10))
// }
