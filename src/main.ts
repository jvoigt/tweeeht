import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TweehtLogger } from 'logger/tweeht-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Setup App with logging
  const app = await NestFactory.create(AppModule, {});
  app.useLogger(app.get(TweehtLogger));

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Tweeeht')
    .setDescription('A simple twitterbot programmed with schlieferbebis in mind.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
