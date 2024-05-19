import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveUserDetailsCommand } from './save-user-details.command';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';
import { SaveUserDetailsEvent } from '../../domain/events/save-user-details.event';

@Injectable()
@CommandHandler(SaveUserDetailsCommand)
export class SaveUserDetailsHandler
  implements ICommandHandler<SaveUserDetailsCommand>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveUserDetailsCommand) {
    const userDetails = await this.userRepository.saveDetails(command);
    const createUserDetailsEvent = new SaveUserDetailsEvent(command);
    this.eventBus.publish(createUserDetailsEvent);
    return userDetails;
  }
}
