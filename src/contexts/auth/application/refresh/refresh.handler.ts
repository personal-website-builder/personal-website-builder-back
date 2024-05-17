import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RefreshCommand } from './refresh.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthRefreshedTokenEvent } from '../../domain/events/auth-refreshed-token.event';
import { AccessTokenPayload } from '../../domain/access-token-payload';
import { envs } from '../../../../config/envs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository, UserRepositoryToken } from '../../../users/domain/user.repository';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(refreshCommand: RefreshCommand) {
    const user = await this.userRepository.findOneById(refreshCommand.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify<AccessTokenPayload>(user.refreshToken, {
        secret: envs.jwtRefreshSecret,
      });
    } catch {
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

    const authUserRefreshedEvent = new AuthRefreshedTokenEvent(user.id);
    this.eventBus.publish(authUserRefreshedEvent);

    return {
      accessToken: jwtSecret,
    };
  }
}
