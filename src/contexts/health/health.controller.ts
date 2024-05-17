import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import { Public } from '../shared/infraestructure/decorators/public.decorator';

@Controller()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Public()
  @Get()
  isAlive() {
    return 'I am alive!';
  }

  @Get('health')
  @HealthCheck()
  check() {
    const prismaClient = new PrismaClient();
    return this.health.check([
      () => this.db.pingCheck('database', prismaClient),
      () =>
        this.disk.checkStorage('storage', {
          path: '/usr/src/app',
          thresholdPercent: 10 * 1024 * 1024 * 1024,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
