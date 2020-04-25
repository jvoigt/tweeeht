import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TweehtLogger } from 'logger/tweeht-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useLogger(new TweehtLogger());
  await app.listen(8000);
}
bootstrap();
