import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, MinLength, IsNumber, ValidateIf, ValidateNested, IsBoolean } from 'class-validator'

import PermissionValidations from './PermissionValidations'

export default class ProfileValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsNumber()
  public level: number

  @ValidateIf(v => !!v.permissions)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PermissionValidations)
  public permissions: PermissionValidations[]

  @IsNotEmpty()
  @IsBoolean()
  public status: boolean
}
