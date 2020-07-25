import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { TweehtLogger } from './tweeht-logger';

@Module({
  exports: [TweehtLogger],
  imports: [ConfigModule],
  providers: [TweehtLogger],
})
export class LoggerModule {}
