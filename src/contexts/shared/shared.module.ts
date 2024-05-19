import { Module } from '@nestjs/common';
import { PrismaRepository } from './infraestructure/prisma.repository';
import { AllSaga } from './infraestructure/sagas/all.saga';

@Module({
  providers: [PrismaRepository, AllSaga],
  exports: [PrismaRepository],
})
export class SharedModule {}
