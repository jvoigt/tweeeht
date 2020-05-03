import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'config/config.module';
import { LoggerModule } from 'logger/logger.module';
import { AdminAuthService } from './admin-auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { BearerStrategy } from './strategies/bearer.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTHCONST } from 'const/auth.const';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        ConfigModule,
        LoggerModule,
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: AUTHCONST.secret,
            signOptions: { expiresIn: AUTHCONST.expiry },
        }),
    ],
    providers: [
        AdminAuthService,
        AuthService,
        LocalStrategy,
        BearerStrategy,
        JwtStrategy,
    ],
})
export class AuthModule { }
