import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { QueryFailedErrorFilter } from 'common/filters';
import { TrimStrings } from 'common/interceptors/trim-strings';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TrimStrings());
  await app.listen(3000);
}
bootstrap();
