import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../../config/envs';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infraestructure/auth.guard';
import { RefreshHandler } from './application/refresh/refresh.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginHandler } from './application/login/login.handler';
import { RegisterHandler } from './application/register/register.handler';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '10min' },
    }),
    UsersModule,
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RefreshHandler,
    LoginHandler,
    RegisterHandler,
  ],
})
export class AuthModule {}
