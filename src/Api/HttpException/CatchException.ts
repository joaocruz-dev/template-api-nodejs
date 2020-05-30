import { HttpException } from '@nestjs/common'

export default class CatchException extends HttpException {
  constructor (error: any, status?: number) {
    super(error.message || error, status || error.status || 400)
  }
}
