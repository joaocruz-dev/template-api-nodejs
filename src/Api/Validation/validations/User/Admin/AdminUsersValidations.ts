import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, MinLength, IsEmail, Length, ValidateIf, IsUrl, IsBoolean, ValidateNested } from 'class-validator'

import { IsObjectId } from '@/Api/Validation/Decorators'
import AddressValidations from '../../Extras/Address/AddressValidations'

export default class AdminUsersValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  public cpf: string

  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  public phone: string

  @ValidateIf(v => !!v.password)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string

  @ValidateIf(v => !!v.avatar)
  @IsNotEmpty()
  @IsUrl()
  public avatar: string

  @ValidateIf(v => !!v.address)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressValidations)
  public address: AddressValidations

  @IsNotEmpty()
  @IsBoolean()
  public status: boolean

  @IsNotEmpty()
  @IsObjectId()
  public idProfile: string
}
