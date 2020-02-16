import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    // this.logger.setContext('CONFIG');
    // this.logger.log('NODE_ENV ', process.env.NODE_ENV);
    this.envConfig = dotenv.parse(fs.readFileSync('env/' + filePath));
    // this.logger.log('Found Env ', this.envConfig ? filePath : 'none');
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
