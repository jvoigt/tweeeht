import { Module } from '@nestjs/common';
import { OutputService } from './output.service';
import { TwitModule } from './twit/twit.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  exports: [OutputService],
  imports: [TwitModule, LoggerModule],
  providers: [OutputService],
})
export class OutputModule {}
