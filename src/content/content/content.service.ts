import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { TweeehtMessage } from '../tweeht-message.interface';

@Injectable()
export class ContentService {

    nextTweeehtMessage(): Observable<TweeehtMessage> {
        const id = Math.random().toString(26).substr(2, 4);

        const nextMessage: TweeehtMessage = {
            text: "debug Message" + id
        }
        return of(nextMessage);
    }

}