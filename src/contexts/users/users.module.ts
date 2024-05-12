import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEmailAlreadyExistValidator } from './validators/user-email-exist.validator';
import { UserNameAlreadyExistValidator } from './validators/user-name-exist.validator';
import { SharedModule } from '../shared/shared.module';

const services = [UsersService];
const validators = [
  UserEmailAlreadyExistValidator,
  UserNameAlreadyExistValidator,
];

@Module({
  imports: [SharedModule],
  providers: [...services, ...validators],
  exports: [...services, ...validators],
})
export class UsersModule {}
