import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { DebugMessageService } from './debug-message/debug-message.service';
import { StaticModule } from './static/static.module';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  exports: [ContentService],
  imports: [StaticModule, ConfigModule, LoggerModule],
  providers: [ContentService, DebugMessageService],
})
export class ContentModule {}
