import { Module } from '@nestjs/common';
import { OutputService } from './output/output.service';
import { TwitModule } from './twit/twit.module';

@Module({
  imports: [TwitModule],
  providers: [OutputService],
  exports: [
    OutputService
  ]
})
export class OutputModule { }
