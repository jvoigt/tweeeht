import { Logger, Optional, Injectable, Scope, forwardRef, Inject } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// import { TweehtLogger } from 'logger/tweeht-logger';

// TODO: we cannot use the logger here, as the logger is dependend on the config...
// but we could restructure so it would work

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(
    // private readonly logger: TweehtLogger,
  ) {
    // this.logger.setContext('CONFIG');

    // select config file by Node ENV or use development.env as fallback
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    // this.logger.debug('NODE_ENV ', process.env.NODE_ENV);
    this.envConfig = dotenv.parse(fs.readFileSync('env/' + filePath));
    // this.logger.log('Found Env ', this.envConfig ? filePath : 'none');
  }

  get(key: string): string {
    const value: string = this.envConfig[key];
    // this.logger.verbose(`Looking for config: ${key}: ${value ? ' found' : 'not found'}.`)
    return value;
  }
}
