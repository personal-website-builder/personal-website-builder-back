import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserRepositoryToken } from './domain/user.repository';
import { UserPrismaRepository } from './infraestructure/user-prisma.repository';
import { SaveUserDetailsHandler } from './application/save-user-details/save-user-details.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './infraestructure/users.controller';
import { UserEmailAlreadyExistValidator } from './infraestructure/validators/user-email-already-exist.validator';
import { UserNameAlreadyExistValidator } from './infraestructure/validators/user-name-already-exist.validator';
import { UserIdExistPipe } from './infraestructure/pipes/user-id-exist.pipe';
import { SaveUserDetailAvatarHandler } from './application/save-user-detail-avatar/save-user-detail-avatar.handler';
import { SaveUserDetailCoverHandler } from './application/save-user-detail-cover/save-user-detail-cover.handler';
import { FindUserDetailsHandler } from './application/find-user-details/find-user-details.handler';

const sharedValidators = [
  UserEmailAlreadyExistValidator,
  UserNameAlreadyExistValidator,
];

const sharePipes = [UserIdExistPipe];

const sharedServices = [
  {
    provide: UserRepositoryToken,
    useClass: UserPrismaRepository,
  },
];

@Module({
  imports: [SharedModule, CqrsModule],
  controllers: [UsersController],
  providers: [
    ...sharedValidators,
    ...sharedServices,
    ...sharePipes,
    SaveUserDetailsHandler,
    SaveUserDetailAvatarHandler,
    SaveUserDetailCoverHandler,
    FindUserDetailsHandler,
  ],
  exports: [...sharedValidators, ...sharedServices, ...sharePipes],
})
export class UsersModule {}
