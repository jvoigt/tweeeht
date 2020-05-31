import { Module, Inject } from '@nestjs/common';
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
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { JwtSecretService } from './jwt-from-secret.service';

@Module({
    controllers: [AuthController],
    exports: [
        JwtModule,
        JwtSecretService
    ],
    imports: [
        ConfigModule,
        LoggerModule,
        UsersModule,
        PassportModule,
        // move to own JWT Module
        JwtModule.registerAsync({
            imports: [LoggerModule, AuthModule],
            inject: [TweehtLogger, JwtSecretService],
            useFactory: async (logger: TweehtLogger, jwtSecretService: JwtSecretService, ) => {
                logger.setContext('JWTMODULE_FACTORY');
                return {
                    secret: jwtSecretService.get(),
                    signOptions: { expiresIn: AUTHCONST.expiry },
                };
            }
        }),
    ],
    providers: [
        AdminAuthService,
        AuthService,
        LocalStrategy,
        BearerStrategy,
        JwtStrategy,
        JwtSecretService,
    ],
})
export class AuthModule { }
