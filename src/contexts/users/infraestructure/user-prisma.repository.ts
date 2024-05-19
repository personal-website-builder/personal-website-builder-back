import { Injectable } from '@nestjs/common';
import { User, UserDetail } from '@prisma/client';
import { PrismaRepository } from '../../shared/infraestructure/prisma.repository';
import { UserRepository } from '../domain/user.repository';
import { SaveUserDetailsCommand } from '../application/save-user-details/save-user-details.command';
import { SaveUserDetailAvatarCommand } from '../application/save-user-detail-avatar/save-user-detail-avatar.command';
import { SaveUserDetailCoverCommand } from '../application/save-user-detail-cover/save-user-detail-cover.command';

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

  async saveDetails(command: SaveUserDetailsCommand): Promise<UserDetail> {
    return this.userDetail.upsert({
      where: {
        userId: command.userId,
      },
      create: {
        ...command,
      },
      update: {
        ...command,
      },
    });
  }

  async saveDetailAvatar(
    command: SaveUserDetailAvatarCommand,
  ): Promise<UserDetail> {
    return this.userDetail.update({
      where: {
        userId: command.userId,
      },
      data: {
        avatar: command.avatar,
      },
    });
  }

  async saveDetailCover(
    command: SaveUserDetailCoverCommand,
  ): Promise<UserDetail> {
    return this.userDetail.update({
      where: {
        userId: command.userId,
      },
      data: {
        cover: command.cover,
      },
    });
  }

  findDetailsByUserId(userId: string): Promise<UserDetail | undefined> {
    return this.userDetail.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
