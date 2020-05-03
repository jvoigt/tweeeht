import { Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModule } from 'logger/logger.module';
import { TweehtLogger } from 'logger/tweeht-logger';

@Module({
  exports: [ConfigService],
  imports: [LoggerModule],
  providers: [
    ConfigService,
  ],
})
export class ConfigModule { }
