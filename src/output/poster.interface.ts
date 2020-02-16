import { TweeehtMessage } from 'tweeht-message.interface';
import { Observable } from 'rxjs';
import { TweehtModule } from 'tweeht-module.interface';

export interface Poster extends TweehtModule {
  post(message: TweeehtMessage): Observable<TweeehtMessage>;
}
