import { IsNotEmpty, IsString } from 'class-validator'
import { IsRuleActions } from '@/Api/ValidationDecorators'

export default class RuleValidations {
  @IsNotEmpty()
  @IsString()
  public route: string

  @IsNotEmpty()
  @IsRuleActions()
  public actions: string[]
}
