import { Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModule } from 'logger/logger.module';

@Module({
  exports: [ConfigService],
  imports: [LoggerModule],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
  ],
})
export class ConfigModule {}
