import { Injectable } from '@nestjs/common';
import { TweeehtMessage } from '../tweeht-message.interface';
import { Messager } from './messager.interface';
import { tap } from 'rxjs/operators';
import { DebugMessageService } from './debug-message/debug-message.service';

@Injectable()
export class ContentService {
  private messager: Messager;

  constructor(private debugMessage: DebugMessageService) {
    this.messager = this.debugMessage;
    console.log('CONTENT: messages from', this.getModuleName());
  }

  getModuleName(): string {
    return this.messager.moduleName;
  }

  nextContent() {
    console.debug('CONTENT getNext');
    return this.messager.getMessage().pipe(
      tap((message: TweeehtMessage) => {
        console.debug('CONTENT: gotNext', message);
      }),
    );
  }
}
