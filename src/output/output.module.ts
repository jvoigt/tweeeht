import { Module } from '@nestjs/common';
import { NoopModule } from './noop/noop.module';
import { OutputService } from './output/output.service';
import { TwitModule } from './twit/twit.module';

@Module({
  imports: [NoopModule, TwitModule],
  providers: [OutputService],
  exports: [
    OutputService
  ]
})
export class OutputModule {}
