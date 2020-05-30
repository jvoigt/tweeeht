import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { UsersModule } from 'users/users.module';
import { StaticCollectionSchema } from './static-collection.schema';
import { StaticMongoCollectionController } from './static-mongo-collection.controller';
import { StaticMongoCollectionService } from './static-mongo-collection.service';
import { UserSchema } from 'users/user.schema';

@Module({
  controllers: [StaticMongoCollectionController],
  exports: [StaticMongoCollectionService],
  imports: [
    ConfigModule,
    LoggerModule,
    MongooseModule.forFeature([
      { name: 'StaticCollection', schema: StaticCollectionSchema },
      { name: 'User', schema: UserSchema }
    ]),
    UsersModule,
  ],
  providers: [StaticMongoCollectionService],
})
export class StaticMongoCollectionModule { }
