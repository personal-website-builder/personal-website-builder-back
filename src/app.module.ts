import { Module } from '@nestjs/common';
import { AuthModule } from './contexts/auth/auth.module';
import { HealthModule } from './contexts/health/health.module';

@Module({
  imports: [AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
