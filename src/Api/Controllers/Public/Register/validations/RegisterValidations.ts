import { IsNotEmpty, IsString, MinLength, Length, IsEmail } from 'class-validator'

export default class RegisterValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  public phone: string

  // @IsNotEmpty()
  // @IsString()
  // @Length(14, 14)
  // public cpf: string

  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string
}
