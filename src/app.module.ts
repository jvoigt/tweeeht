import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OutputModule } from './output/output.module';
import { ContentModule } from './content/content.module';
import { ConfigModule } from './config/config.module';
import { ShedulerModule } from './sheduler/sheduler.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  controllers: [AppController],
  imports: [
    OutputModule,
    ContentModule,
    ConfigModule,
    ShedulerModule,
    LoggerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
