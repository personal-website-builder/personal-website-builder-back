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
export class UserIdExistValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  async validate(id: string): Promise<boolean> {
    return !!(await this.userRepository.findOneById(id));
  }

  defaultMessage(args?: ValidationArguments): string {
    const user = args.object as { id?: string; userId?: string };
    let id = user.id;
    if (!id) {
      id = user.userId;
    }
    return this.i18nService.translate('user.id.notFound', {
      args: { id },
    });
  }
}
