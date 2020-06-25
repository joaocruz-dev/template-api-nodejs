import axios from 'axios'
import { Controller, Param, Get } from '@nestjs/common'

@Controller('address')
export default class AddressController {
  @Get(':cep')
  async get (@Param('cep') cep: string) {
    const data = (await axios.get(`https://viacep.com.br/ws/${cep}/json`)).data
    const address = {
      street: data.logradouro,
      district: data.bairro,
      complement: data.complemento,
      state: data.uf,
      city: data.localidade
    }
    return address
  }
}
