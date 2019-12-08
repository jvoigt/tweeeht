import { Module } from '@nestjs/common';
import { NoopModule } from './noop/noop.module';
import { OutputService } from './output/output.service';

@Module({
  imports: [NoopModule],
  providers: [OutputService],
  exports: [
    OutputService
  ]
})
export class OutputModule {}
