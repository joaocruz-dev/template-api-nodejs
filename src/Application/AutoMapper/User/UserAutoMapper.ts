import { ObjectId } from 'mongodb'
import { Mapper, mapFrom, ignore, preCondition, condition } from '@nartc/automapper'

import { User } from '@/Domain/Entity'
import Token from '@/Api/Functions/Auth/Token'
import { UserViewModel } from '@/Api/ViewModel'

Mapper.createMap(User, UserViewModel)
  .forMember(
    dest => dest.id,
    mapFrom(src => src._id.toHexString())
  )
  .forMember(
    dest => dest.password,
    ignore()
  )
  .forMember(
    dest => dest.idProfile,
    mapFrom(src => src.idProfile.toHexString())
  )
  .reverseMap()
  .forPath(
    dest => dest._id,
    preCondition(src => !!src.id),
    mapFrom(src => new ObjectId(src.id))
  )
  .forPath(
    dest => dest.cpf,
    preCondition(src => !!src.cpf),
    mapFrom(src => validateCPF(src.cpf))
  )
  .forPath(
    dest => dest.email,
    preCondition(src => !!src.email),
    mapFrom(src => src.email.toLowerCase().trim())
  )
  .forPath(
    dest => dest.password,
    preCondition(src => !!src.password),
    mapFrom(src => Token.newPass(src.password))
  )
  .forPath(
    dest => dest.status,
    condition(src => src.status === true || src.status === false)
  )
  .forPath(
    dest => dest.confirmed,
    ignore()
  )
  .forPath(
    dest => dest.idProfile,
    preCondition(src => !!src.idProfile),
    mapFrom(src => new ObjectId(src.idProfile))
  )
  .forPath(
    dest => dest.hashTokens,
    ignore()
  )
  .forPath(
    dest => dest.messagingTokens,
    ignore()
  )

function validateCPF (cpf: string): string {
  if (!isValidCPF(cpf)) throw new Error('CPF inválido!')
  return cpf
}

function isValidCPF (cpf: string): boolean {
  cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

  const regex = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g
  if (cpf.match(regex)) return false

  let sum = 0
  let rest = 0

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (rest !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (rest !== parseInt(cpf.substring(10, 11))) return false

  return true
}
