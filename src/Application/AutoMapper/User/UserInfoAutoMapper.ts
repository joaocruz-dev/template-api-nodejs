import { ObjectId } from 'mongodb'
import { Mapper, mapFrom, preCondition } from '@nartc/automapper'

import { User, UserInfo } from '@/Domain/Entity'
import { UserViewModel, UserInfoViewModel } from '@/Api/ViewModel'

Mapper.createMap(UserInfo, UserInfoViewModel)
  .forMember(
    dest => dest.id,
    mapFrom(src => src._id.toHexString())
  )
  .reverseMap()
  .forPath(
    dest => dest._id,
    preCondition(src => !!src.id),
    mapFrom(src => new ObjectId(src.id))
  )

Mapper.createMap(User, UserInfo)
  .forMember(
    dest => dest._id,
    mapFrom(src => src._id)
  )

Mapper.createMap(UserViewModel, UserInfoViewModel)
