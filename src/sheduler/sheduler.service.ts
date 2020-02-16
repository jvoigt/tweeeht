import { Injectable } from '@nestjs/common';
import { IntervalService } from './interval/interval.service';
import { Observable } from 'rxjs';
import { Ticker } from './ticker.interface';

@Injectable()
export class ShedulerService {
  private ticker: Ticker;
  constructor(private intervalService: IntervalService) {
    this.ticker = this.intervalService;
    console.log('SHEDULER: ticking with', this.getModuleName());
  }

  getModuleName(): string {
    return this.ticker.moduleName;
  }

  getTick(): Observable<number> {
    console.debug('SHEDULER: INTERVAL');
    return this.ticker.getTick();
  }
}
