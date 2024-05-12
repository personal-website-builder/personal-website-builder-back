import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaRepository } from '../shared/services/prisma.repository';

@Injectable()
export class UsersService extends PrismaRepository {
  findOneByName(name: string): Promise<User | undefined> {
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

  async create(
    email: string,
    name: string,
    password: string,
  ): Promise<User | undefined> {
    return this.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
  }
}
