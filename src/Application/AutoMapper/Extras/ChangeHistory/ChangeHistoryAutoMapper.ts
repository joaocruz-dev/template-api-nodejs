import { Mapper } from '@nartc/automapper'

import { ChangeHistory } from '@/Infra/Repository/Extras/Base/BaseRepository'

Mapper.createMap(ChangeHistory, ChangeHistory)
