import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { Messager } from 'content/messager.interface';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Observable, throwError } from 'rxjs';
import { TweeehtMessage } from 'tweeht-message.interface';

@Injectable()
export class MongoCollectionService implements Messager {
  moduleName = 'COLLECTION';

  constructor(
    private config: ConfigService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext(this.moduleName);
  }

  getMessage(): Observable<TweeehtMessage> {
    return throwError(new Error('Not yet implemented'));

  }
}
