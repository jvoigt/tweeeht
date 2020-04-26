import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { AdminAuthService } from './admin-auth.service';
import { LocalStrategy } from './local.strategy';
import { BearerStrategy } from './bearer.strategy';

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        PassportModule,
    ],
    providers: [LocalStrategy, BearerStrategy, AdminAuthService],
})
export class AuthModule { }
