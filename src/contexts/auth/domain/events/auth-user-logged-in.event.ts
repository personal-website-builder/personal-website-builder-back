import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { LoginCommand } from '../../application/login/login.command';

export class AuthUserLoggedInEvent extends DomainEvent {
  constructor(data: LoginCommand) {
    super(DomainEventName.AUTH_USER_REGISTERED, 'USER', data);
  }
}
