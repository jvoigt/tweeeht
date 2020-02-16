import { Observable } from 'rxjs';
import { TweehtModule } from 'tweeht-module.interface';

export interface Ticker extends TweehtModule {
  getTick(): Observable<number>;
}
