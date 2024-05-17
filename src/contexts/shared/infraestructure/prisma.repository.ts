import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
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
