import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { ContentService } from './content.service';
import { DebugMessageService } from './debug-message/debug-message.service';
import { StaticMongoCollectionModule } from './static-mongo-collection/static-mongo-collection.module';
import { StaticModule } from './static/static.module';

@Module({
  exports: [ContentService],
  imports: [
    StaticModule,
    ConfigModule,
    LoggerModule,
    StaticMongoCollectionModule,
  ],
  providers: [ContentService, DebugMessageService],
})
export class ContentModule {}
