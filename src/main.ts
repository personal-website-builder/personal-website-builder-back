import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppLogger } from './contexts/shared/infraestructure/loggers/app-logger.service';
import { AllExceptionsFilter } from './contexts/users/infraestructure/exception-filters/all.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger('Nest'),
  });

  const logger = new AppLogger('Main');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  await app.listen(envs.port);

  logger.log(`Application is running on port: ${envs.port}`);
  logger.log(`Swagger documentation is available at /api`);

  if (envs.nodeEnv !== 'production') {
    logger.log('envs: ', envs);
  }
}
bootstrap();
