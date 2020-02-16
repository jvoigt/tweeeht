import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { INTERVALCONST } from 'const/interval.const';
import { interval, Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { Ticker } from 'sheduler/ticker.interface';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class IntervalService implements Ticker {
  moduleName = 'INTERVAL';

  /** time in ms */
  private period: number;

  constructor(
    private config: ConfigService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext(this.moduleName);
    const configPeriodMs =
      60 * 1000 * parseFloat(this.config.get('INTERVAL_PERIOD_MIN'));
    this.logger.debug(`Found config`);
    this.logger.debug(`interval with ${configPeriodMs}ms`);

    this.period = configPeriodMs
      ? configPeriodMs
      : INTERVALCONST.default_period;
    this.logger.log(`running with period of ${this.period}ms`);
  }

  getTick(): Observable<number> {
    return interval(this.period).pipe(
      startWith(0),
      tap(() => {
        this.logger.debug('Tick');
      }),
    );
  }
}
