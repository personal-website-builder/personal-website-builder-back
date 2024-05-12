import { IsEmail, IsString, Validate } from 'class-validator';
import { UserEmailAlreadyExistValidator } from 'src/contexts/users/validators/user-email-exist.validator';
import { UserNameAlreadyExistValidator } from 'src/contexts/users/validators/user-name-exist.validator';

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
