import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, MinLength, Length, ValidateIf, IsUrl, ValidateNested } from 'class-validator'

import AddressValidations from '../Extras/Address/AddressValidations'

export default class UserValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  public phone: string

  @ValidateIf(v => !!v.avatar)
  @IsNotEmpty()
  @IsUrl()
  public avatar: string

  @ValidateIf(v => !!v.address)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressValidations)
  public address: AddressValidations
}
