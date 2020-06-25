import { ObjectId } from 'mongodb'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export default function IsObjectId (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} deve ser do tipo "ObjectId"`, ...validationOptions },
      validator: {
        validate (value: string, args: ValidationArguments) {
          if (!value) return false
          return value.length === 24 && ObjectId.isValid(value)
        }
      }
    })
  }
}
