import { Injectable } from '@nestjs/common';
import { TweeehtMessage } from 'tweeht-message.interface';
import { TwitService } from './twit/twit.service';
import { Poster } from './poster.interface';

@Injectable()
export class OutputService {
  private poster: Poster;

  constructor(private twitService: TwitService) {
    this.poster = this.twitService;
    console.log('OUTPUT: posting with', this.getModuleName());
  }

  getModuleName(): string {
    return this.poster.moduleName;
  }

  send(message: TweeehtMessage) {
    console.debug('OUTPUT SEND:', message);
    this.poster.post(message).subscribe(result => {
      console.debug('OUTPUT SENT:', result);
    });
  }
}
