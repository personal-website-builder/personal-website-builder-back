import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { RegisterCommand } from '../../application/register/register.command';

export class AuthUserRegisteredEvent extends DomainEvent {
  constructor(data: RegisterCommand) {
    super(DomainEventName.AUTH_USER_REGISTERED, 'USER', data);
  }
}
