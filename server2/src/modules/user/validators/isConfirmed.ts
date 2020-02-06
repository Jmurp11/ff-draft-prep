import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { User } from '../../../entity';

@ValidatorConstraint({ async: true })
export class IsConfirmedConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });
            // TODO: Change this to !user!confirmed once email is set up
            if (user!.confirmed) return false;
            return true;
        } catch (e) {
            throw (e);
        }
    }

}

export function IsConfirmed(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsConfirmedConstraint
        });
    };
}