import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';

export class AuthRefreshedTokenEvent extends DomainEvent {
  constructor(userId: string) {
    super(userId, DomainEventName.AUTH_TOKEN_REFRESHED);
  }

  toPrimitives(): any {
    return {
      id: this.id,
      userId: this.userId,
      eventName: this.eventName,
      ocurredOn: this.ocurredOn,
      eventType: this.eventType,
    };
  }
}
