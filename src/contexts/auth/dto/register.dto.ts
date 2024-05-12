import { IsEmail, IsString, Validate } from 'class-validator';
import { UserNameAlreadyExistValidator } from '../../../contexts/users/validators/user-name-exist.validator';
import { UserEmailAlreadyExistValidator } from '../../../contexts/users/validators/user-email-exist.validator';

export class RegisterDto {
  @IsEmail()
  @Validate(UserEmailAlreadyExistValidator)
  email: string;

  @IsString()
  @Validate(UserNameAlreadyExistValidator)
  name: string;

  @IsString()
  password: string;
}
