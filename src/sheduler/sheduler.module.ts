import { Module } from '@nestjs/common';
import { IntervalService } from './interval/interval.service';
import { ShedulerService } from './sheduler.service';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [ShedulerService],
  imports: [ConfigModule],
  providers: [IntervalService, ShedulerService],
})
export class ShedulerModule {}
