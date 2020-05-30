import { Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModule } from 'logger/logger.module';
import { TweehtLogger } from 'logger/tweeht-logger';
import { jwtSecretFromConfigFactory } from './jwt-from-config.factory';

@Module({
  exports: [ConfigService, jwtSecretFromConfigFactory],
  imports: [LoggerModule],
  providers: [
    ConfigService,
    jwtSecretFromConfigFactory
  ],
})
export class ConfigModule { }
