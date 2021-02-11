import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Team } from '../../../entity/Team';

@ValidatorConstraint({ async: true })
export class TeamExistsConstraint implements ValidatorConstraintInterface {

    async validate(nickname: string) {
        return Team.findOne({
            where: {
                nickname
            }
        }).then(team => {
            if (team) return false;
            return true;
        });
    }

}

export function TeamExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: TeamExistsConstraint
        });
    };
}