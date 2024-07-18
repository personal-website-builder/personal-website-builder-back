import { Injectable } from '@nestjs/common';
import { Media } from '@prisma/client';
import { PrismaRepository } from 'src/contexts/shared/infraestructure/prisma.repository';
import { MediaRepository } from '../domain/media.repository';

@Injectable()
export class MediaPrismaRepository
  extends PrismaRepository
  implements MediaRepository
{
  async findByIds(ids: string[]): Promise<Media[]> {
    return await this.media.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findById(id: string): Promise<Media> {
    return await this.media.findUnique({
      where: {
        id: id,
      },
    });
  }

  async removeMedia(id: string): Promise<number> {
    try {
      await this.media.findUnique({
        where: {
          id: id,
        },
      });
      return 1;
    } catch {
      return 0;
    }
  }
}
