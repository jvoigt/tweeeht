import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [TwitService],
  imports: [ConfigModule],
  providers: [TwitService],
})
export class TwitModule {}
