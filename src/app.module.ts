import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OutputModule } from './output/output.module';
import { ContentModule } from './content/content.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [OutputModule, ContentModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
