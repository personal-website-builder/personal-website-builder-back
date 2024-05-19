import { User, UserDetail } from '@prisma/client';
import { SaveUserDetailsCommand } from '../application/save-user-details/save-user-details.command';
import { SaveUserDetailAvatarCommand } from '../application/save-user-detail-avatar/save-user-detail-avatar.command';
import { SaveUserDetailCoverCommand } from '../application/save-user-detail-cover/save-user-detail-cover.command';

export const UserRepositoryToken = 'UserRepository';
export interface UserRepository {
  findOneById(id: string): Promise<User | undefined>;
  findOneByName(name: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  create(email: string, name: string, password: string): Promise<User>;
  updateRefreshToken(id: string, jwtRefresh: string): Promise<User>;
  saveDetails(details: SaveUserDetailsCommand): Promise<UserDetail>;
  saveDetailAvatar(
    detailAvatar: SaveUserDetailAvatarCommand,
  ): Promise<UserDetail>;
  saveDetailCover(detailCover: SaveUserDetailCoverCommand): Promise<UserDetail>;
  findDetailsByUserId(userId: string): Promise<UserDetail | undefined>;
}
