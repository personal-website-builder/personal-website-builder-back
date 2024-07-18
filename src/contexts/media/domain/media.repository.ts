import { Media } from '@prisma/client';

export const MediaRepositoryToken = 'MediaRepository';

export interface MediaRepository {
  findByIds(ids: string[]): Promise<Media[]>;
  findById(id: string): Promise<Media>;
  removeMedia(id: string): Promise<number>;
}
