import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { BotsController } from './bots.controller';
import { UsersModule } from 'users/users.module';
import { BotCollectionModule } from './bots-collections/bots-collection.module';

@Module({
  controllers: [BotsController],
  imports: [
    ConfigModule,
    LoggerModule,
    UsersModule,
    BotCollectionModule,
  ],
  providers: [],
})
export class BotModule { }
