import { Module } from '@nestjs/common';
import { LoggerModule } from 'logger/logger.module';
import { ConfigModule } from 'config/config.module';

@Module({
  exports: [],
  imports: [ConfigModule, LoggerModule],
  providers: [],
})
export class MongoCollectionModule {}
