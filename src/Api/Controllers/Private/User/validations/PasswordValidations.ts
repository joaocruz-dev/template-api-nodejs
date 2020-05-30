import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export default class PasswordValidations {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  public password: string

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  public newPassword: string
}
