import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserDetailsQuery } from './find-user-details.query';
import {
  UserRepository,
  UserRepositoryToken,
} from '../../domain/user.repository';

@Injectable()
@QueryHandler(FindUserDetailsQuery)
export class FindUserDetailsHandler
  implements IQueryHandler<FindUserDetailsQuery>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: FindUserDetailsQuery) {
    return await this.userRepository.findDetailsByUserId(command.userId);
  }
}
