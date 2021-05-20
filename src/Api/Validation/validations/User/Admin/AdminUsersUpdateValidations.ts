import { IsNotEmpty } from 'class-validator'

import { IsObjectId } from '@/Api/Validation/Decorators'
import AdminUsersValidations from './AdminUsersValidations'

export default class AdminUsersUpdateValidations extends AdminUsersValidations {
  @IsNotEmpty()
  @IsObjectId()
  public id: string
}
