import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtractUserMiddleware } from 'middleware/extract-user.middleware';
import { UsersModule } from 'users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ContentModule } from './content/content.module';
import { LoggerModule } from './logger/logger.module';
import { MongooseConfigService } from './mongoose-config.service';
import { OutputModule } from './output/output.module';
import { ShedulerModule } from './sheduler/sheduler.module';

@Module({
  controllers: [AppController],
  imports: [
    OutputModule,
    ShedulerModule,
    AuthModule,
    ConfigModule,
    ContentModule,
    LoggerModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useClass: MongooseConfigService,
    }),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractUserMiddleware).forRoutes('*');
  }
}
