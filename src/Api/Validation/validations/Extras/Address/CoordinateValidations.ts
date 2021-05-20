import { IsNotEmpty, IsNumber } from 'class-validator'

import { CoordinateViewModel } from '@/Api/ViewModel'

export default class CoordinateValidations implements CoordinateViewModel {
  @IsNotEmpty()
  @IsNumber()
  public lat: number

  @IsNotEmpty()
  @IsNumber()
  public lng: number
}
