import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import {
  MediaRepository,
  MediaRepositoryToken,
} from '../../domain/media.repository';

@ValidatorConstraint()
@Injectable()
export class MediaIdExistValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject(MediaRepositoryToken)
    private readonly mediaRepository: MediaRepository,
    private readonly i18nService: I18nService,
  ) {}

  async validate(id: string): Promise<boolean> {
    return !!(await this.mediaRepository.findById(id));
  }

  defaultMessage(args?: ValidationArguments): string {
    const media = args.object as { id?: string; mediaId?: string };
    let id = media.id;
    if (!id) {
      id = media.mediaId;
    }
    return this.i18nService.translate('media.id.notFound', {
      args: { id },
    });
  }
}
