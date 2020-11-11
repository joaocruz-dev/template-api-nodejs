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
    dest => dest.password,
    preCondition(src => !!src.password),
    mapFrom(src => Token.newPass(src.password))
  )
  .forPath(
    dest => dest.idProfile,
    preCondition(src => !!src.idProfile),
    mapFrom(src => new ObjectId(src.idProfile))
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
    dest => dest.hashPassword,
    ignore()
  )
  .forPath(
    dest => dest.hashConfirmed,
    ignore()
  )
