import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerModule } from 'logger/logger.module';
import { ConfigModule } from 'config/config.module';
import { StaticMongoCollectionService } from './static-mongo-collection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticCollectionSchema } from './static-collection.schema';
import { StaticMongoCollectionController } from './static-mongo-collection.controller';
import { ExtractUserMiddleware } from 'auth/middleware/extract-user.middleware';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';

@Module({
  controllers: [StaticMongoCollectionController],
  exports: [StaticMongoCollectionService],
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    LoggerModule,
    MongooseModule.forFeature([{ name: 'StaticCollection', schema: StaticCollectionSchema }]),
  ],
  providers: [StaticMongoCollectionService],
})
export class StaticMongoCollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtractUserMiddleware)
      .forRoutes(StaticMongoCollectionController);
  }
}

