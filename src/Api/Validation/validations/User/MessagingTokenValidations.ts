import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export default class MessagingTokenValidations {
  @IsNotEmpty()
  @IsString()
  @MinLength(25)
  public token: string
}
