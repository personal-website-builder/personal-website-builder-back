import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { LoginCommand } from '../../application/login/login.command';

export class AuthUserLoggedInEvent extends DomainEvent {
  private loginCommand: LoginCommand;

  constructor(userId: string, data: LoginCommand) {
    super(userId, DomainEventName.AUTH_USER_REGISTERED, 'USER');
    this.loginCommand = data;
  }

  toPrimitives(): any {
    return {
      id: this.id,
      userId: this.userId,
      eventName: this.eventName,
      ocurredOn: this.ocurredOn,
      data: this.loginCommand,
      eventType: this.eventType,
    };
  }
}
