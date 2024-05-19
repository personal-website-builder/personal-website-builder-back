import { DomainEventName } from 'src/contexts/shared/domain/enums/domain-event-name';
import { DomainEvent } from '../../../shared/domain/domain.event';
import { SaveUserDetailAvatarCommand } from '../../application/save-user-detail-avatar/save-user-detail-avatar.command';

export class SaveUserDetailAvatarEvent extends DomainEvent {
  constructor(data: SaveUserDetailAvatarCommand) {
    super(DomainEventName.USER_DETAIL_AVATAR_SAVED, 'USER', data);
  }
}
