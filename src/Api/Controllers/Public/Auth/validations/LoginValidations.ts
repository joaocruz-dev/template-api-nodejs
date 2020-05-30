import { IsNotEmpty, IsEmail, IsString, MinLength, IsBoolean } from 'class-validator'

export default class LoginValidations {
  @IsNotEmpty()
  @IsEmail()
  public login: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string

  @IsNotEmpty()
  @IsBoolean()
  public remember: boolean
}
