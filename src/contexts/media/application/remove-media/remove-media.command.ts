import { IsUUID, Validate } from 'class-validator';
import { MediaIdExistValidator } from '../../infraestructure/validators/media-id-exist.validator';

export class RemoveMediaCommand {
  @IsUUID()
  @Validate(MediaIdExistValidator)
  id: string;
}
