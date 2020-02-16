import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { tap } from 'rxjs/operators';
import { TweeehtMessage } from '../tweeht-message.interface';
import { DebugMessageService } from './debug-message/debug-message.service';
import { Messager } from './messager.interface';
import { StaticService } from './static/static.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class ContentService {
  private messager: Messager;

  constructor(
    private config: ConfigService,
    private debugMessage: DebugMessageService,
    private staticService: StaticService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('CONTEXT');

    const contentConfig = this.config.get('CONTENT_PROVIDER');
    // TODO: this should be move to the module
    // a factory should provide the right service
    // But later we may want to connect multiple accounts and flows....
    switch (contentConfig) {
      case 'STATIC':
        this.messager = this.staticService;
      case 'DEBUG':
      default:
        this.messager = this.debugMessage;
    }

    this.logger.log('CONTENT: messages from', this.getModuleName());
  }

  getModuleName(): string {
    return this.messager.moduleName;
  }

  nextContent() {
    this.logger.debug('GetNext');
    return this.messager.getMessage().pipe(
      tap((message: TweeehtMessage) => {
        this.logger.debug(`GotNext ${message}`);
      }),
    );
  }
}
