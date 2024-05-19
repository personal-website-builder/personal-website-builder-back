import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveUserDetailCoverCommand } from './save-user-detail-cover.command';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';
import { SaveUserDetailCoverEvent } from '../../domain/events/save-user-detail-cover.event';

@Injectable()
@CommandHandler(SaveUserDetailCoverCommand)
export class SaveUserDetailCoverHandler
  implements ICommandHandler<SaveUserDetailCoverCommand>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveUserDetailCoverCommand) {
    const userDetails = await this.userRepository.saveDetailCover(command);
    const createUserDetailsEvent = new SaveUserDetailCoverEvent(command);
    this.eventBus.publish(createUserDetailsEvent);
    return userDetails;
  }
}
