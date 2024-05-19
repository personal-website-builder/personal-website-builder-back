import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveUserDetailAvatarCommand } from './save-user-detail-avatar.command';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';
import { SaveUserDetailAvatarEvent } from '../../domain/events/save-user-detail-avatar.event';

@Injectable()
@CommandHandler(SaveUserDetailAvatarCommand)
export class SaveUserDetailAvatarHandler
  implements ICommandHandler<SaveUserDetailAvatarCommand>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveUserDetailAvatarCommand) {
    const userDetails = await this.userRepository.saveDetailAvatar(command);
    const createUserDetailsEvent = new SaveUserDetailAvatarEvent(command);
    this.eventBus.publish(createUserDetailsEvent);
    return userDetails;
  }
}
