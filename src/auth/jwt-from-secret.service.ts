import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class JwtSecretService {
  constructor(
    private readonly logger: TweehtLogger,
    private readonly config: ConfigService,
  ) {
    this.logger.setContext('JWTSECRETSERVICE');
  }

  get(): string {
    const secret = this.config.get('JWT_SECRET');
    if (!secret) {
      this.logger.error('No JWT_SECRET Found. Add to env');
      throw new Error('No JWT Secret (X╭╮X)');
    }
    return secret;
  }
}
