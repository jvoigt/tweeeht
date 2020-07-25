import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { TwitService } from './twit.service';

@Module({
  exports: [TwitService],
  imports: [ConfigModule, LoggerModule],
  providers: [TwitService],
})
export class TwitModule {}
