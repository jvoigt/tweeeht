import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  providers: [TwitService],
  imports: [ConfigModule],
  exports: [TwitService]
})
export class TwitModule { }
