import { IsNotEmpty, IsString, IsArray } from 'class-validator'

export default class PermissionValidations {
  @IsNotEmpty()
  @IsString()
  public idController: string

  @IsNotEmpty()
  @IsArray()
  public idActions: string[]
}
