import { Module } from '@nestjs/common';
import { OutputService } from './output.service';
import { TwitModule } from './twit/twit.module';
import { LoggerModule } from 'logger/logger.module';
import { DebugOutputModule } from './debug-output/debug-output.module';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [OutputService],
  imports: [
    ConfigModule,
    DebugOutputModule,
    LoggerModule,
    TwitModule,
  ],
  providers: [OutputService],
})
export class OutputModule { }
