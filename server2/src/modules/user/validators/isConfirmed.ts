import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { User } from '../../../entity';

@ValidatorConstraint({ async: true })
export class IsConfirmedConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        return User.findOne({
            where: {
                email
            }
        }).then(user => {
            if (!user!.confirmed) return false;
            return true;
        });
    }

}

export function IsConfirmed(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsConfirmedConstraint
        });
   };
}