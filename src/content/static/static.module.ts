import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { StaticService } from './static.service';

@Module({
  exports: [StaticService],
  imports: [ConfigModule, LoggerModule],
  providers: [StaticService],
})
export class StaticModule {}
