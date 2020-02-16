import { Observable } from 'rxjs';
import { TweeehtMessage } from '../tweeht-message.interface';
import { TweehtModule } from 'tweeht-module.interface';

export interface Messager extends TweehtModule {
  getMessage(): Observable<TweeehtMessage>;
}
