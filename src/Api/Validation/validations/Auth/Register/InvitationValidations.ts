import { IsNotEmpty, IsString, MinLength, Length, IsEmail, ValidateIf } from 'class-validator'

export default class InvitationValidations {
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

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ValidateIf(v => !!v.password)
  public password: string

  @IsNotEmpty()
  @IsString()
  @Length(50)
  public hash: string
}
