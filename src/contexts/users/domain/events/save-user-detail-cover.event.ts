import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { SaveUserDetailCoverCommand } from '../../application/save-user-detail-cover/save-user-detail-cover.command';

export class SaveUserDetailCoverEvent extends DomainEvent {
  constructor(data: SaveUserDetailCoverCommand) {
    super(DomainEventName.USER_DETAIL_AVATAR_SAVED, 'USER', data);
  }
}
