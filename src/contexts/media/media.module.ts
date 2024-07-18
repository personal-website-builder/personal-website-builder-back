import { Module } from '@nestjs/common';
import { MediaController } from './infraestructure/media.controller';
import { UploadImageService } from './application/upload-image/upload-image.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RemoveMediaHandler } from './application/remove-media/remove-media.handler';
import { MediaPrismaRepository } from './infraestructure/media-prisma.repository';

@Module({
  controllers: [CqrsModule, MediaController],
  providers: [UploadImageService, RemoveMediaHandler, MediaPrismaRepository],
})
export class MediaModule {}
