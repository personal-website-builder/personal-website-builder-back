import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { SaveUserDetailsCommand } from '../../application/save-user-details/save-user-details.command';

export class SaveUserDetailsEvent extends DomainEvent {
  constructor(data: SaveUserDetailsCommand) {
    super(DomainEventName.USER_DETAILS_SAVED, 'USER', data);
  }
}
