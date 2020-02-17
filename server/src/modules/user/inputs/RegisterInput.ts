import { InputType, Field } from 'type-graphql';
import { MinLength, Length, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from '../validators/isEmailAlreadyExist';
import { IsUsernameAlreadyExist } from '../validators/isUsernameAlreadyExist';
import { duplicateEmail, duplicateUsername, passwordNotLongEnough } from '../messages/messages';
@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: duplicateEmail })
  email: string;

  @Field()
  @MinLength(8, {
    message: passwordNotLongEnough
  })
  password: string;

  @Field()
  @Length(1, 30)
  @IsUsernameAlreadyExist({ message: duplicateUsername })
  username: string;
}
