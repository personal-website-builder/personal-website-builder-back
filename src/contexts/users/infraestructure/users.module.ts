import { Module } from '@nestjs/common';
import { UserEmailAlreadyExistValidator } from './validators/user-email-exist.validator';
import { UserNameAlreadyExistValidator } from './validators/user-name-exist.validator';
import { SharedModule } from '../../shared/infraestructure/shared.module';
import { UserRepositoryToken } from '../domain/user.repository';
import { UserPrismaRepository } from './user-prisma.repository';

const sharedValidators = [
  UserEmailAlreadyExistValidator,
  UserNameAlreadyExistValidator,
];

const sharedServices = [
  {
    provide: UserRepositoryToken,
    useClass: UserPrismaRepository,
  },
];

@Module({
  imports: [SharedModule],
  providers: [...sharedValidators, ...sharedServices],
  exports: [...sharedValidators, ...sharedServices],
})
export class UsersModule {}
