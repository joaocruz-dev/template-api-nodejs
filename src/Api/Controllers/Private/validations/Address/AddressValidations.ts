import { IsNotEmpty, IsString, Length, IsNumber, ValidateIf } from 'class-validator'
import { AddressViewModel } from '@/Api/ViewModel'

export default class AddressValidations implements AddressViewModel {
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

  public lat: number

  public lng: number
}
