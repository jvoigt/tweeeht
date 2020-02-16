import { Module } from '@nestjs/common';
import { TweehtLogger } from './tweeht-logger';

@Module({
  exports: [TweehtLogger],
  providers: [TweehtLogger],
})
export class LoggerModule {}
