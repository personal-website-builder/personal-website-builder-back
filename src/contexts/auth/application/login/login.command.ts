import { IsEmail, IsString } from 'class-validator';

export class LoginCommand {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
