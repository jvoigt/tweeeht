import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { LoggerModule } from 'logger/logger.module';
import { ConfigModule } from 'config/config.module';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    LoggerModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService],
})
export class UsersModule { }
