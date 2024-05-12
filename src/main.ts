import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppLoggerService } from './contexts/shared/services/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
  });

  const logger = app.get<AppLoggerService>(AppLoggerService);
  logger.setContext('Main');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableVersioning();

  await app.listen(envs.port);

  logger.log(`Application is running on port: ${envs.port}`);
  logger.log(`Swagger documentation is available at /api`);

  if (envs.nodeEnv !== 'production') {
    logger.log('envs: ', envs);
  }
}
bootstrap();
