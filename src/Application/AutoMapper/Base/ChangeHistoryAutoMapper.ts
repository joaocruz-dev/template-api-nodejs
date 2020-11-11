import { Mapper } from '@nartc/automapper'

import { ChangeHistory } from '@/Infra/Repository/Base/BaseRepository'

Mapper.createMap(ChangeHistory, ChangeHistory)
