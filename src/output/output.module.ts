import { Module } from '@nestjs/common';
import { OutputService } from './output.service';
import { TwitModule } from './twit/twit.module';

@Module({
  exports: [OutputService],
  imports: [TwitModule],
  providers: [OutputService],
})
export class OutputModule {}
