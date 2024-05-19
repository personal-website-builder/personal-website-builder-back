import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from './login.command';
import { AuthUserLoggedInEvent } from '../../domain/events/auth-user-logged-in.event';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from '../../domain/access-token-payload';
import { envs } from '../../../../config/envs';
import { JwtService } from '@nestjs/jwt';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../../users/domain/user.repository';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.userRepository.findOneByEmail(command.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(command.password, user.password)) {
      throw new UnauthorizedException();
    }

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

    const authUserLoggedInEvent = new AuthUserLoggedInEvent(command);
    this.eventBus.publish(authUserLoggedInEvent);

    return {
      accessToken: jwtSecret,
    };
  }
}
