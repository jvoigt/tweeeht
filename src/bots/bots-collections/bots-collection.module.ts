import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { UsersModule } from 'users/users.module';
import { BotsCollectionService } from './bots-collection.service';
import { BotDocument, BotSchema } from './bots.schema';

@Module({
  exports: [BotsCollectionService],
  imports: [
    ConfigModule,
    LoggerModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: BotDocument.name, schema: BotSchema },
    ]),
  ],
  providers: [BotsCollectionService],
})
export class BotCollectionModule { }
