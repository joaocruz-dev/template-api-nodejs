import { ObjectId } from 'mongodb'
import { Mapper } from '@nartc/automapper'

import Token from '@/Api/Auth/Token'
import { User } from '@/Domain/Entity'
import { UserViewModel } from '@/Api/ViewModel'

Mapper.createMap(User, UserViewModel)
  .forMember(
    dest => dest.id,
    opts => opts.mapFrom(src => src._id.toHexString())
  )
  .forMember(
    dest => dest.password,
    opts => opts.ignore()
  )
  .forMember(
    dest => dest.idProfile,
    opts => opts.mapFrom(src => src.idProfile.toHexString())
  )
  .reverseMap()
  .forPath(
    dest => dest._id,
    opts => opts.preCondition(src => !!src.id).mapFrom(src => new ObjectId(src.id))
  )
  .forPath(
    dest => dest.password,
    opts => opts.preCondition(src => !!src.password).mapFrom(src => Token.newPass(src.password))
  )
  .forPath(
    dest => dest.idProfile,
    opts => opts.preCondition(src => !!src.idProfile).mapFrom(src => new ObjectId(src.idProfile))
  )
  .forPath(
    dest => dest.status,
    opts => opts.condition(src => src.status === true || src.status === false)
  )
  .forPath(
    dest => dest.hashPassword,
    opts => opts.ignore()
  )
  .forPath(
    dest => dest.confirmed,
    opts => opts.ignore()
  )
  .forPath(
    dest => dest.hashConfirmed,
    opts => opts.ignore()
  )
