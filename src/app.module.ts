import { I18nModule } from 'nestjs-i18n';
import { AuthModule } from './contexts/auth/auth.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './contexts/health/health.module';
import { UsersModule } from './contexts/users/users.module';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    AuthModule,
    HealthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
