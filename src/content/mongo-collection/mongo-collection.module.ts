import { Module } from '@nestjs/common';
import { LoggerModule } from 'logger/logger.module';
import { ConfigModule } from 'config/config.module';
import { MongoCollectionService } from './mongo-collection.service';

@Module({
  exports: [MongoCollectionService],
  imports: [
    ConfigModule,
    LoggerModule,

  ],
  providers: [MongoCollectionService],
})
export class MongoCollectionModule { }
