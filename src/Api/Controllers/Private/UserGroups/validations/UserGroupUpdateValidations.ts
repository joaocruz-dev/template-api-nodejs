
import { IsNotEmpty } from 'class-validator'
import { IsObjectId } from '@/Api/ValidationDecorators'
import UserGroupValidations from './UserGroupValidations'

export default class UserGroupUpdateValidations extends UserGroupValidations {
  @IsNotEmpty()
  @IsObjectId()
  public id: string
}
