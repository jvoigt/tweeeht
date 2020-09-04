import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'config/config.module';
import { AUTHCONST } from 'const/auth.const';
import { LoggerModule } from 'logger/logger.module';
import { TweehtLogger } from 'logger/tweeht-logger';
import { UsersModule } from 'users/users.module';
import { AdminAuthService } from './admin-auth.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtSecretService } from './jwt-from-secret.service';
import { BearerStrategy } from './strategies/bearer.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  exports: [JwtModule, JwtSecretService],
  imports: [
    ConfigModule,
    LoggerModule,
    UsersModule,
    PassportModule,
    // move to own JWT Module
    JwtModule.registerAsync({
      imports: [LoggerModule, AuthModule],
      inject: [TweehtLogger, JwtSecretService],
      useFactory: async (
        logger: TweehtLogger,
        jwtSecretService: JwtSecretService,
      ) => {
        logger.setContext('JwtModuleFactory');
        return {
          secret: jwtSecretService.get(),
          signOptions: { expiresIn: AUTHCONST.expiry },
        };
      },
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
export class AuthModule {}
