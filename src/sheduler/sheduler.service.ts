import { Injectable } from '@nestjs/common';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Observable } from 'rxjs';
import { IntervalService } from './interval/interval.service';
import { Ticker } from './ticker.interface';

@Injectable()
export class ShedulerService {
  private ticker: Ticker;
  constructor(
    private intervalService: IntervalService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext('SHEDULER');
    this.ticker = this.intervalService;
    this.logger.log(`Ticking with ${this.getModuleName()}`);
  }

  getModuleName(): string {
    return this.ticker.moduleName;
  }

  getTick(): Observable<number> {
    this.logger.debug('TICK');
    return this.ticker.getTick();
  }
}
