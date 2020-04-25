import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { DebugOutputService } from './debug-output.service';

@Module({
  exports: [DebugOutputService],
  imports: [ConfigModule, LoggerModule],
  providers: [DebugOutputService],
})
export class DebugOutputModule { }
