import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';

@Module({
  providers: [TwitService]
})
export class TwitModule {}
