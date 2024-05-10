import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient {
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
