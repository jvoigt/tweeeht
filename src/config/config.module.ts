import { Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModule } from 'logger/logger.module';
import { TweehtLogger } from 'logger/tweeht-logger';

@Module({
  exports: [ConfigService],
  imports: [LoggerModule],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
        new TweehtLogger(),
      ),
    },
  ],
})
export class ConfigModule { }
