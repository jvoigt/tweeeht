import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Poster } from 'output/poster.interface';
import { Observable, of } from 'rxjs';
import { TweeehtMessage, TweeehtMessageStatus } from 'tweeht-message.interface';

@Injectable()
export class DebugOutputService implements Poster {
    moduleName = 'DebugOutput';

    constructor(config: ConfigService, private readonly logger: TweehtLogger) {
        this.logger.setContext('DebugOutputService');
    }

    post(message: TweeehtMessage): Observable<TweeehtMessage> {
        message.status = TweeehtMessageStatus.DONE;
        message.extRef = 'debug';

        this.logger.debug(`GOT TEXT: ${message.text}`);
        this.logger.debug(`GOT IMAGE: ${message.imageUrl}`);
        this.logger.debug(`GOT REF: ${message.extRef}`);
        return of(message);
    }

}
