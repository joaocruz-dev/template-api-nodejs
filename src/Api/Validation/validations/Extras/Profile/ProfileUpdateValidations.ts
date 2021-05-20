import { IsNotEmpty } from 'class-validator'

import ProfileValidations from './ProfileValidations'
import { IsObjectId } from '@/Api/Validation/Decorators'

export default class ProfileUpdateValidations extends ProfileValidations {
  @IsNotEmpty()
  @IsObjectId()
  public id: string
}
