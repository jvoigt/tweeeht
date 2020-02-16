import { Injectable, Logger } from '@nestjs/common';
import { Observable, of, never, throwError } from 'rxjs';
import { TweeehtMessage } from 'tweeht-message.interface';
import { Messager } from 'content/messager.interface';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class StaticService implements Messager {
  moduleName = 'STATIC';

  constructor(
    private config: ConfigService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext(this.moduleName);

    const jsonPath = this.config.get('STATIC_JSON');
    this.logger.debug('Looking for JSON', jsonPath);
  }

  getMessage(): Observable<TweeehtMessage> {
    return throwError(new Error('Not yet implemented'));
  }
}
