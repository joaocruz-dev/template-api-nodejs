import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, Length, IsNumber, ValidateIf, ValidateNested } from 'class-validator'

import CoordinateValidations from './CoordinateValidations'

export default class AddressValidations {
  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  public cep: string

  @IsNotEmpty()
  @IsString()
  public street: string

  @IsNotEmpty()
  @IsNumber()
  public number: number

  @IsNotEmpty()
  @IsString()
  public district: string

  @ValidateIf(v => !!v.complement)
  @IsNotEmpty()
  @IsString()
  public complement: string

  @IsNotEmpty()
  @IsString()
  public state: string

  @IsNotEmpty()
  @IsString()
  public city: string

  @ValidateIf(v => !!v.coordinate)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoordinateValidations)
  public coordinate: CoordinateValidations
}
