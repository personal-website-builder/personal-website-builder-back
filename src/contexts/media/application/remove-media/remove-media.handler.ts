import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveMediaCommand } from './remove-media.command';
import {
  MediaRepository,
  MediaRepositoryToken,
} from '../../domain/media.repository';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(RemoveMediaCommand)
export class RemoveMediaHandler implements ICommandHandler<RemoveMediaCommand> {
  constructor(
    @Inject(MediaRepositoryToken)
    private readonly mediaRepository: MediaRepository,
    private readonly i18nService: I18nService,
  ) {}

  async execute(command: RemoveMediaCommand): Promise<number> {
    const result = await this.mediaRepository.removeMedia(command.id);
    if (result === 0) {
      throw new InternalServerErrorException(
        this.i18nService.t('media.errors.removeOneError'),
      );
    }
  }
}
