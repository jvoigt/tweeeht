import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { DebugMessageService } from './debug-message/debug-message.service';

@Module({
  exports: [ContentService],
  providers: [ContentService, DebugMessageService],
})
export class ContentModule {}
