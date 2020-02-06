import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { User } from '../../../entity';

@ValidatorConstraint({ async: true })
export class IsForgotPasswordLockConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (user!.forgotPasswordLock) return false;
            return true;
        } catch (e) {
            throw (e);
        }
    }

}

export function IsForgotPasswordLock(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsForgotPasswordLockConstraint
        });
    };
}