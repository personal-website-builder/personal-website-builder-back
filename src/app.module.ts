import { Module } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { HealthModule } from './contexts/health/health.module';
import { SharedModule } from './contexts/shared/infraestructure/shared.module';
import { UsersModule } from './contexts/users/infraestructure/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-lang'])],
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
