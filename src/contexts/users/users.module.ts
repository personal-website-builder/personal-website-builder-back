import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEmailAlreadyExistValidator } from './validators/user-email-exist.validator';
import { UserNameAlreadyExistValidator } from './validators/user-name-exist.validator';

const services = [UsersService];
const validators = [
  UserEmailAlreadyExistValidator,
  UserNameAlreadyExistValidator,
];

@Module({
  providers: [...services, ...validators],
  exports: [...services, ...validators],
})
export class UsersModule {}
