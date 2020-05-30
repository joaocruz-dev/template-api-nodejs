import { Mapper } from '@nartc/automapper'
import { ObjectId } from 'mongodb'
import { UserGroup } from '@/Domain/Entity'
import { UserGroupViewModel } from '@/Api/ViewModel'

Mapper.createMap(UserGroup, UserGroupViewModel)
  .forMember(
    dest => dest.id,
    opts => opts.mapFrom(src => src._id.toHexString())
  )
  .reverseMap()
  .forPath(
    dest => dest._id,
    opts => opts.preCondition(src => !!src.id).mapFrom(src => new ObjectId(src.id))
  )
