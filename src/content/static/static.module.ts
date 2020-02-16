import { Module } from '@nestjs/common';
import { LoggerModule } from 'logger/logger.module';
import { StaticService } from './static.service';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [StaticService],
  imports: [ConfigModule, LoggerModule],
  providers: [StaticService],
})
export class StaticModule {}
