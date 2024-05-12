import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from '../../../contexts/users/users.service';

@ValidatorConstraint()
@Injectable()
export class UserNameAlreadyExistValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly usersService: UsersService,
    private readonly i18nService: I18nService,
  ) {}

  async validate(name: string, args: ValidationArguments): Promise<boolean> {
    const { id } = args.object as { id: string };
    const user = await this.usersService.findOneByName(name);
    console.log(user);
    if (id) {
      return user && user.id === id;
    }
    return !user;
  }

  defaultMessage(args?: ValidationArguments): string {
    return this.i18nService.translate('user.name.alreadyExist', {
      args: args.object,
    });
  }
}
