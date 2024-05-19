import { IsDate, IsMobilePhone, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveUserDetailsCommand {
  userId: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsMobilePhone()
  phone: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  province: string;

  @IsString()
  address: string;

  @IsString()
  about: string;

  @IsString()
  bio: string;

  @IsString()
  email: string;
}
