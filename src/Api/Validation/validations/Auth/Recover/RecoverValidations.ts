import { IsNotEmpty, IsEmail } from 'class-validator'

export default class RecoverValidations {
  @IsNotEmpty()
  @IsEmail()
  public email: string
}
