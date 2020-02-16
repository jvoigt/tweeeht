import { Injectable } from '@nestjs/common';
import { interval, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ContentService } from './content/content.service';
import { TweeehtMessage } from './tweeht-message.interface';
import { OutputService } from './output/output.service';
import { ShedulerService } from 'sheduler/sheduler.service';

@Injectable()
export class AppService {
  constructor(
    private contentService: ContentService,
    private outputService: OutputService,
    private shedulerService: ShedulerService,
  ) {
    this.start();
  }

  start() {
    this.shedulerService
      .getTick()
      .pipe(
        switchMap((tick: number) => {
          console.log('APP: Tick');
          return this.contentService.nextContent();
        }),
      )
      .subscribe((message: TweeehtMessage) => {
        console.log('APP: Content', message);
        this.outputService.send(message);
      });
  }

  getStatus(): any {
    return {
      content: this.contentService.getModuleName(),
      output: this.outputService.getModuleName(),
      sheduler: this.shedulerService.getModuleName(),
    };
  }
}
