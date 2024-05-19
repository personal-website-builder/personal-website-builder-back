import { Module } from '@nestjs/common';
import { PrismaRepository } from './prisma.repository';
import { AllSaga } from './sagas/all.saga';

@Module({
  providers: [PrismaRepository, AllSaga],
  exports: [PrismaRepository],
})
export class SharedModule {}
