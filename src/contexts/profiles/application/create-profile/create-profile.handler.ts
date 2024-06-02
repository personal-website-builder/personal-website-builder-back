import {
  UserRepository,
  UserRepositoryToken,
} from './../../../users/domain/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from './create-profile.command';

@Injectable()
@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProfileCommand) {
    return command;
  }
}
