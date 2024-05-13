import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaRepository } from '../shared/services/prisma.repository';

@Injectable()
export class UsersService {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async findOneById(userId: string) {
    return this.prismaRepository.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return this.prismaRepository.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prismaRepository.user.findUnique({
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
    return this.prismaRepository.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
  }

  async updateRefreshToken(id: string, jwtRefresh: string) {
    return this.prismaRepository.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: jwtRefresh,
      },
    });
  }
}
