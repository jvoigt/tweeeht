import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService,],
  imports: [],
  providers: [
    ConfigService,
  ],
})
export class ConfigModule { }
