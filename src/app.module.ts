import { AuthModule } from './contexts/auth/auth.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './contexts/health/health.module';
import { UsersModule } from './contexts/users/users.module';

@Module({
  imports: [AuthModule, HealthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
