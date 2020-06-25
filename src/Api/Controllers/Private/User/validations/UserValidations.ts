import { IsNotEmpty, IsString, MinLength, Length } from 'class-validator'

export default class UserValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  public phone: string
}
