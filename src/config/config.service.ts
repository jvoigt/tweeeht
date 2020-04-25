import { Logger, Optional } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TweehtLogger } from 'logger/tweeht-logger';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(
    private readonly filePath: string,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('CONFIG');
    this.logger.debug('NODE_ENV ', process.env.NODE_ENV);
    this.envConfig = dotenv.parse(fs.readFileSync('env/' + filePath));
    this.logger.log('Found Env ', this.envConfig ? filePath : 'none');
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
