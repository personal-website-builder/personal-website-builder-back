import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaRepository } from '../../shared/infraestructure/prisma.repository';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserPrismaRepository
  extends PrismaRepository
  implements UserRepository
{
  async findOneById(id: string): Promise<User | undefined> {
    return this.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return this.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(email: string, name: string, password: string): Promise<User> {
    return this.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
  }

  async updateRefreshToken(id: string, jwtRefresh: string): Promise<User> {
    return this.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: jwtRefresh,
      },
    });
  }
}
