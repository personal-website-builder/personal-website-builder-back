import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterCommand } from './register.command';
import { AuthUserRegisteredEvent } from '../../domain/events/auth-user-registered.event';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from '../../domain/access-token-payload';
import { envs } from '../../../../config/envs';
import { JwtService } from '@nestjs/jwt';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../../users/domain/user.repository';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerCommand: RegisterCommand) {
    const hashedPassword = bcrypt.hashSync(registerCommand.password, 10);
    const user = await this.userRepository.create(
      registerCommand.email,
      registerCommand.name,
      hashedPassword,
    );

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jwtSecret = this.jwtService.sign(accessTokenPayload, {
      secret: envs.jwtSecret,
    });

    const jwtRefresh = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d', secret: envs.jwtRefreshSecret },
    );

    await this.userRepository.updateRefreshToken(user.id, jwtRefresh);

    const authUserRegisteredEvent = new AuthUserRegisteredEvent(
      registerCommand,
    );
    this.eventBus.publish(authUserRegisteredEvent);

    return {
      accessToken: jwtSecret,
    };
  }
}
