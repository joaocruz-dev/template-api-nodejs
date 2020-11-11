import { ObjectId } from 'mongodb'
import { Mapper, mapFrom, preCondition } from '@nartc/automapper'

import { Profile } from '@/Domain/Entity'
import { ProfileViewModel } from '@/Api/ViewModel'

Mapper.createMap(Profile, ProfileViewModel)
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
