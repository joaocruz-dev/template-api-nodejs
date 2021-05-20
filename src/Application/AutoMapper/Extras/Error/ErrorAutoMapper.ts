import { ObjectId } from 'mongodb'
import { Mapper, mapFrom, preCondition } from '@nartc/automapper'

import { _Error } from '@/Domain/Entity'
import { ErrorViewModel } from '@/Api/ViewModel'

Mapper.createMap(_Error, ErrorViewModel)
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
