import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AUTHCONST } from 'const/auth.const';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService,
        private logger: TweehtLogger,
        @Inject('JWT_SECRET_FROM_CONFIG') private jwtSecretFromConfig: string,
    ) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecretFromConfig
        });
        this.logger.setContext('JWTSTRATEGY');
    }


    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }
}
