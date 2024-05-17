import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';

@ValidatorConstraint()
@Injectable()
export class UserEmailAlreadyExistValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const { id } = args.object as { id: string };
    const user = await this.userRepository.findOneByEmail(email);
    if (id) {
      return user && user.id === id;
    }
    return !user;
  }

  defaultMessage(args?: ValidationArguments): string {
    return this.i18nService.translate('user.email.alreadyExist', {
      args: args.object,
    });
  }
}
