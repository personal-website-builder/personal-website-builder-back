import { Module } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { join } from 'path';
import { AuthModule } from './contexts/auth/auth.module';
import { HealthModule } from './contexts/health/health.module';
import { SharedModule } from './contexts/shared/shared.module';
import { UsersModule } from './contexts/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProfilesModule } from './contexts/profiles/profiles.module';
import { MediaModule } from './contexts/media/media.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/public',
      serveRoot: '/public',
      serveStaticOptions: {
        index: false,
      },
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    SharedModule,
    ProfilesModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
