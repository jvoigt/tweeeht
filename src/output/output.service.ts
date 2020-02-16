import { Injectable, Logger } from '@nestjs/common';
import { TweeehtMessage } from 'tweeht-message.interface';
import { Poster } from './poster.interface';
import { TwitService } from './twit/twit.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class OutputService {
  private poster: Poster;

  constructor(
    private twitService: TwitService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('OUTPUT');
    this.poster = this.twitService;
    this.logger.log(`posting with ${this.getModuleName()}`);
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
