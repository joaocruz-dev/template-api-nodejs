import { IsNotEmpty, IsEmail, IsString, MinLength, Length } from 'class-validator'

export default class PasswordRecoverValidations {
  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string

  @IsNotEmpty()
  @IsString()
  @Length(50)
  public hash: string
}
