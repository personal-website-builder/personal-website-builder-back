import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';

export class AuthRefreshedTokenEvent extends DomainEvent {
  constructor(userId: string) {
    super(DomainEventName.AUTH_TOKEN_REFRESHED, 'USER', { userId });
  }
}
