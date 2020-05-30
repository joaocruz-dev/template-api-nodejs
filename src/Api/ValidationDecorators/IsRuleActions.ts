import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

const actions = ['view', 'add', 'update', 'delete']

export default function IsRuleActions (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRuleActions',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} deve ser do tipo "RuleActions"`, ...validationOptions },
      validator: {
        validate (value: string[], args: ValidationArguments) {
          if (!Array.isArray(value)) return false
          const list = value.filter(v => !!actions.find(a => a === v))
          return value.length === list.length
        }
      }
    })
  }
}
