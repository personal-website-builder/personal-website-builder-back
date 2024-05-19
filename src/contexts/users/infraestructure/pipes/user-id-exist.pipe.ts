import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserIdExistPipe implements PipeTransform {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  async transform(value: string) {
    const user = await this.userRepository.findOneById(value);
    if (!user) {
      throw new BadRequestException(
        this.i18nService.translate('user.id.notFound', { args: { id: value } }),
      );
    }
    return value;
  }
}
