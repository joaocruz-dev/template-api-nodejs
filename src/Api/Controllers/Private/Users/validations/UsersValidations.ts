import { IsNotEmpty, IsString, MinLength, IsEmail, Length, ValidateIf, IsUrl, IsBoolean } from 'class-validator'
import { IsObjectId } from '@/Api/ValidationDecorators'

export default class UsersValidations {
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
  @MinLength(8)
  public password: string

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  public phone: string

  @ValidateIf(v => !!v.avatar)
  @IsNotEmpty()
  @IsUrl()
  public avatar: string

  @IsNotEmpty()
  @IsObjectId()
  public usergroup: string

  @IsNotEmpty()
  @IsBoolean()
  public status: boolean
}
