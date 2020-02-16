import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { INTERVALCONST } from 'const/interval.const';
import { ConfigService } from 'config/config.service';
import { tap } from 'rxjs/operators';
import { Ticker } from 'sheduler/ticker.interface';

@Injectable()
export class IntervalService implements Ticker {
  moduleName = 'INTERVAL';

  /** time in ms */
  private period: number;

  constructor(private config: ConfigService) {
    const configPeriod = parseInt(this.config.get('INTERVAL_PERIOD'), 10);

    this.period = configPeriod ? configPeriod : INTERVALCONST.default_period;
    console.log('INTERVAL: running with period of', this.period);
  }

  getTick(): Observable<number> {
    return interval(this.period).pipe(
      tap(() => {
        console.debug('INTERVAL: Tick');
      }),
    );
  }
}
