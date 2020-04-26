import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ContentModule } from './content/content.module';
import { LoggerModule } from './logger/logger.module';
import { OutputModule } from './output/output.module';
import { ShedulerModule } from './sheduler/sheduler.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    OutputModule,
    ShedulerModule,
    AuthModule,
    ConfigModule,
    ContentModule,
    LoggerModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tweeeht'),
  ],
  providers: [AppService],
})
export class AppModule { }
