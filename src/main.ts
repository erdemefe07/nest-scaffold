import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { QueryFailedErrorFilter } from 'common/filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
