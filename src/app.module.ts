import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './contexts/auth/auth.module';
import { HealthModule } from './contexts/health/health.module';

@Module({
  imports: [AuthModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
