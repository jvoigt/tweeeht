import { Injectable, Logger } from '@nestjs/common';
import { TweeehtMessage } from 'tweeht-message.interface';
import { Poster } from './poster.interface';
import { TwitService } from './twit/twit.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { DebugOutputService } from './debug-output/debug-output.service';
import { ConfigService } from 'config/config.service';

@Injectable()
export class OutputService {
  private poster: Poster;

  constructor(
    private debugService: DebugOutputService,
    private readonly config: ConfigService,
    private readonly logger: TweehtLogger,
    private twitService: TwitService,
  ) {
    this.logger.setContext('OUTPUT');

    const outputConfig = this.config.get('OUTPUT_PROVIDER');
    this.logger.debug(`Got OUTPUT_PROVIDER: ${outputConfig}`);
    // TODO: this should be move to the module
    // a factory should provide the right service
    // But later we may want to connect multiple accounts and flows....
    switch (outputConfig) {
      case 'TWIT':
        this.poster = this.twitService;
        break;
      case 'DEBUG':
      default:
        this.poster = this.debugService;
    }

    this.logger.log(`Posting with ${this.getModuleName()}`);
  }

  getModuleName(): string {
    return this.poster.moduleName;
  }

  send(message: TweeehtMessage) {
    this.logger.debug(`SEND: ${message.text}`);
    this.poster.post(message).subscribe(result => {
      this.logger.debug(`SENT: ${result.text}`);
    });
  }
}
