import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { TweeehtMessage } from '../tweeht-message.interface';

@Injectable()
export class ContentService {

    nextTweeehtMessage(): Observable<TweeehtMessage> {
        const nextMessage: TweeehtMessage = {
            text: "debug Message"
        }
        return of(nextMessage);
    }

}