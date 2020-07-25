import { Observable } from 'rxjs';
import { TweeehtMessage } from 'tweeht-message.interface';
import { TweehtModule } from 'tweeht-module.interface';

export interface Poster extends TweehtModule {
  post(message: TweeehtMessage): Observable<TweeehtMessage>;
}
