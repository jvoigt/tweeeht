import { Injectable } from '@nestjs/common';
import { interval, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ContentService } from './content/content/content.service';
import { TweeehtMessage } from './content/tweeht-message.interface';
import { OutputService } from './output/output/output.service';

@Injectable()
export class AppService {
  constructor(
    private contentService: ContentService,
    private outputService: OutputService,
  ) {
    this.start();
  }

  getHello(): string {
    return 'Hello World!';
  }

  start() {
    interval(5000)
      .pipe(
        switchMap((tick: number) => {
          console.log('APP-TICK');
          return this.contentService.nextTweeehtMessage();
        }),
      )
      .subscribe((message: TweeehtMessage) => {
        console.log('APP-CONTENT', message);
        this.outputService.send(message);
      });
  }
}
