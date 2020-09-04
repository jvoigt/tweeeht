import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtSecretService } from 'auth/jwt-from-secret.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private logger: TweehtLogger,
    jwtSecretService: JwtSecretService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretService.get(),
    });
    this.logger.setContext('JwtStrategy');
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
