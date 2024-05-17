import { User } from '@prisma/client';

export const UserRepositoryToken = 'UserRepository';
export interface UserRepository {
  findOneById(id: string): Promise<User | undefined>;
  findOneByName(name: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  create(email: string, name: string, password: string,): Promise<User>;
  updateRefreshToken(id: string, jwtRefresh: string): Promise<User>;
}
