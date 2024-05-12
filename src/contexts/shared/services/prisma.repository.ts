import {
  BeforeApplicationShutdown,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaRepository
  extends PrismaClient
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor() {
    super();
  }

  onApplicationBootstrap() {
    this.$connect();
  }

  beforeApplicationShutdown() {
    this.$disconnect();
  }
}
