import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigService } from './mongoose-config.service';
import { ConfigModule } from './config/config.module';
import { ContentModule } from './content/content.module';
import { LoggerModule } from './logger/logger.module';
import { OutputModule } from './output/output.module';
import { ShedulerModule } from './sheduler/sheduler.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    OutputModule,
    ShedulerModule,
    AuthModule,
    ConfigModule,
    ContentModule,
    LoggerModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useClass: MongooseConfigService,
    }),
  ],
  providers: [AppService],
})
export class AppModule { }
