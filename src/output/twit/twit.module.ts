import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  exports: [TwitService],
  imports: [ConfigModule, LoggerModule],
  providers: [TwitService],
})
export class TwitModule {}
