import { Observable } from 'rxjs';
import { TweehtModule } from 'tweeht-module.interface';
import { TweeehtMessage } from '../tweeht-message.interface';

export interface Messager extends TweehtModule {
  getMessage(): Observable<TweeehtMessage>;
}
