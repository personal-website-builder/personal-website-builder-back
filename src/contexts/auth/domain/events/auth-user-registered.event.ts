import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { RegisterCommand } from '../../application/register/register.command';

export class AuthUserRegisteredEvent extends DomainEvent {
  private registeredCommand: RegisterCommand;

  constructor(userId: string, data: RegisterCommand) {
    super(userId, DomainEventName.AUTH_USER_REGISTERED, 'USER');
    this.registeredCommand = data;
  }

  toPrimitives(): any {
    return {
      id: this.id,
      userId: this.userId,
      eventName: this.eventName,
      ocurredOn: this.ocurredOn,
      data: this.registeredCommand,
      eventType: this.eventType,
    };
  }
}
