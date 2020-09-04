import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { switchMap } from 'rxjs/operators';
import { ShedulerService } from 'sheduler/sheduler.service';
import { ContentService } from './content/content.service';
import { OutputService } from './output/output.service';
import { TweeehtMessage } from './tweeht-message.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private contentService: ContentService,
    private outputService: OutputService,
    private shedulerService: ShedulerService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('AppService');

    const loopConfig = !JSON.parse(this.config.get('DISABLE_LOOP'));
    this.logger.debug(`loopConfig: ${loopConfig}`);

    this.logger.log(`Main Loop ${loopConfig ? 'enabled' : 'disabled'}`);
    if (loopConfig) {
      this.start();
    }
  }

  start() {
    this.shedulerService
      .getTick()
      .pipe(
        switchMap((tick: number) => {
          this.logger.log('Tick');
          return this.contentService.nextContent();
        }),
      )
      .subscribe((message: TweeehtMessage) => {
        this.logger.log(`Next Content ${message.text}`);
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
