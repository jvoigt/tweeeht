import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { INTERVALCONST } from 'const/interval.const';
import { ConfigService } from 'config/config.service';
import { tap, startWith } from 'rxjs/operators';
import { Ticker } from 'sheduler/ticker.interface';

@Injectable()
export class IntervalService implements Ticker {
  moduleName = 'INTERVAL';

  /** time in ms */
  private period: number;

  constructor(private config: ConfigService) {
    const configPeriodMs =
      60 * 1000 * parseFloat(this.config.get('INTERVAL_PERIOD_MIN'));
    console.debug('INTERVAL: found cofig for interval in ms', config);

    this.period = configPeriodMs
      ? configPeriodMs
      : INTERVALCONST.default_period;
    console.log('INTERVAL: running with period of', this.period);
  }

  getTick(): Observable<number> {
    return interval(this.period).pipe(
      startWith(0),
      tap(() => {
        console.debug('INTERVAL: Tick');
      }),
    );
  }
}
