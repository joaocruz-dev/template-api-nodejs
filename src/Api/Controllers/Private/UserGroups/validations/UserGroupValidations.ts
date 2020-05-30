import { IsNotEmpty, IsString, MinLength, IsNumber, ValidateIf, ValidateNested, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'
import RuleValidations from './RuleValidations'

export default class UserGroupValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsNumber()
  public level: number

  @ValidateIf(v => !!v.rules)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RuleValidations)
  public rules: RuleValidations[]

  @IsNotEmpty()
  @IsBoolean()
  public status: boolean
}
