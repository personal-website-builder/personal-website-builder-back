import { Module } from '@nestjs/common';
import { PrismaRepository } from './services/prisma.repository';

@Module({
  providers: [PrismaRepository],
  exports: [PrismaRepository],
})
export class SharedModule {}
