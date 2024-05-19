import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { envs } from '../../../config/envs';

@Injectable()
export class PrismaRepository
  extends PrismaClient
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor() {
    super();
    console.log(envs);
  }

  onApplicationBootstrap() {
    this.$connect();
  }

  beforeApplicationShutdown() {
    this.$disconnect();
  }
}
