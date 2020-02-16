import { Module } from '@nestjs/common';
import { IntervalService } from './interval/interval.service';
import { ShedulerService } from './sheduler.service';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  exports: [ShedulerService],
  imports: [ConfigModule, LoggerModule],
  providers: [IntervalService, ShedulerService],
})
export class ShedulerModule {}
