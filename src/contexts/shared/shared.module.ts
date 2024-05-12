import { Module } from '@nestjs/common';
import { PrismaRepository } from './services/prisma.repository';
import { AppLoggerService } from './services/app-logger.service';

@Module({
  providers: [PrismaRepository, AppLoggerService],
  exports: [PrismaRepository, AppLoggerService],
})
export class SharedModule {}
