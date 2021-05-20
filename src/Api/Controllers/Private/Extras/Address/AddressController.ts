import axios from 'axios'
import { Controller, Req, Param, Get } from '@nestjs/common'

import { CatchException } from '@/Api/HttpException'
import { ReqAuth } from '@/Api/Middleware/Auth/AuthMiddleware'

@Controller('address')
export default class AddressController {
  @Get(':cep')
  async get (@Req() req: ReqAuth, @Param('cep') cep: string) {
    try {
      const data = (await axios.get(`https://viacep.com.br/ws/${cep}/json`)).data
      return {
        street: data.logradouro,
        district: data.bairro,
        complement: data.complemento,
        state: data.uf,
        city: data.localidade
      }
    } catch (error) {
      throw new CatchException(error, null, req.auth.user)
    }
  }
}
