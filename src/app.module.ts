import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ContentModule } from './content/content.module';
import { LoggerModule } from './logger/logger.module';
import { OutputModule } from './output/output.module';
import { ShedulerModule } from './sheduler/sheduler.module';

@Module({
  controllers: [AppController],
  imports: [
    OutputModule,
    ContentModule,
    ConfigModule,
    ShedulerModule,
    LoggerModule,
    // TODO: move we convenient
    // not shure if this is the right location
    // we should move this import to a DbModule
    MongooseModule.forRoot('mongodb://localhost:27017/tweeeht'),

  ],
  providers: [AppService],
})
export class AppModule { }
