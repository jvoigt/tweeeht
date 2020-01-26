import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  exports: [TwitService],
  imports: [ConfigModule],
  providers: [TwitService],
})
export class TwitModule {}
