import {
  IsEmail,
  IsMobilePhone,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { UserIdExistValidator } from '../../../users/infraestructure/validators/user-id-exist.validator';

export class CreateProfileCommand {
  @IsUUID()
  @Validate(UserIdExistValidator)
  userId: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @IsString()
  bio: string;

  @IsString()
  about: string;
}
