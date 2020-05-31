import { Injectable, Scope, Logger, LogLevel, Optional, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from 'config/config.service';


@Injectable()
export class TweehtLogger extends Logger {

    private static levels: LogLevel[] = [
        'verbose',
        'debug',
        'log',
        'warn',
        'error',
    ]
    private minLevel: LogLevel = 'verbose';

    constructor(private config: ConfigService) {
        super();
        const configLevel: LogLevel = this.config.get('LOG_LEVEL') as LogLevel;
        this.minLevel = configLevel ? configLevel : 'debug';
    }
    log(message: any, context?: string): any {
        if (this.checkAboveMinLevel('log')) {
            super.log(message, context);
        }
    };
    error(message: any, trace?: string, context?: string): any {
        if (this.checkAboveMinLevel('error')) {
            super.log(message, context);
        }
    };
    warn(message: any, context?: string): any {
        if (this.checkAboveMinLevel('warn')) {
            super.log(message, context);
        }
    };
    debug(message: any, context?: string): any {
        if (this.checkAboveMinLevel('debug')) {
            super.log(message, context);
        }
    };
    verbose(message: any, context?: string): any {
        if (this.checkAboveMinLevel('verbose')) {

            super.log(message, context);
        }
    };

    private checkAboveMinLevel(lvl: LogLevel): boolean {
        const posLvl = TweehtLogger.levels.indexOf(lvl);
        const posMinLvl = TweehtLogger.levels.indexOf(this.minLevel)
        return posLvl >= posMinLvl;
    }
}
