import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator'

export default class GetInvitationValidations {
  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @Length(50)
  public hash: string
}
