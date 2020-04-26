import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OutputModule } from './output/output.module';
import { ContentModule } from './content/content.module';
import { ConfigModule } from './config/config.module';
import { ShedulerModule } from './sheduler/sheduler.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule,
    ContentModule,
    LoggerModule,
    OutputModule,
    ShedulerModule,
  ],
  providers: [AppService],
})
export class AppModule { }
