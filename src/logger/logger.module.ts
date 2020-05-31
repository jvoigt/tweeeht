import { Module, forwardRef } from '@nestjs/common';
import { TweehtLogger } from './tweeht-logger';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [TweehtLogger],
  imports: [ConfigModule],
  providers: [
    TweehtLogger,
  ],
})
export class LoggerModule { }
