import { IsNotEmpty } from 'class-validator'
import { IsObjectId } from '@/Api/ValidationDecorators'

import ProfileValidations from './ProfileValidations'

export default class ProfileUpdateValidations extends ProfileValidations {
  @IsNotEmpty()
  @IsObjectId()
  public id: string
}
