import { Logger, Optional, Injectable, Scope } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('CONFIG');

    // select config file by Node ENV or use development.env as fallback
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    this.logger.debug('NODE_ENV ', process.env.NODE_ENV);
    this.envConfig = dotenv.parse(fs.readFileSync('env/' + filePath));
    this.logger.log('Found Env ', this.envConfig ? filePath : 'none');
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
