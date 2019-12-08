import { Module } from '@nestjs/common';
import { ContentService } from './content/content.service';

@Module({
  providers: [ContentService],
  exports: [
    ContentService
  ]
})
export class ContentModule {}
