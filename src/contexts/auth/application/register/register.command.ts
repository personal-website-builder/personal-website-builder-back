import { IsEmail, IsString, Validate } from 'class-validator';
import { UserEmailAlreadyExistValidator } from '../../../users/infraestructure/validators/user-email-exist.validator';
import { UserNameAlreadyExistValidator } from '../../../users/infraestructure/validators/user-name-exist.validator';

export class RegisterCommand {
  @IsEmail()
  @Validate(UserEmailAlreadyExistValidator)
  email: string;

  @IsString()
  @Validate(UserNameAlreadyExistValidator)
  name: string;

  @IsString()
  password: string;
}
