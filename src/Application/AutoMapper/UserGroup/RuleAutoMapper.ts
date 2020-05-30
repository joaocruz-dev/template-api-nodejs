import { Mapper } from '@nartc/automapper'
import { Rule } from '@/Domain/Entity'
import { RuleViewModel } from '@/Api/ViewModel'

Mapper.createMap(Rule, RuleViewModel)
  .reverseMap()
