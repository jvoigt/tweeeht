import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'auth/interfaces/jwt-payload.interface';
import { Request, Response } from 'express';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  constructor(private logger: TweehtLogger, private jwtService: JwtService) {
    this.logger.setContext('ExtractUserMiddleware');
  }

  async use(req: Request, res: Response, next: () => void) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1];
      this.logger.verbose(`Extracting Req: Found${token}`)

      try {
        const payload: JwtPayload = this.jwtService.verify(token);
        (req as any).username = payload.username;
        this.logger.verbose(`Extracting Req: Saved ${payload.username}`)
        // we could accesss the user now but this would be async so meh.
      } catch (err) {
        // if the jwt is expired or invalid it will throw
        this.logger.warn(`Extracting Req: Did not find username - expired or invalid: ${err}`)
          (req as any).username = undefined;
      }
    } else {
      this.logger.verbose(`Extracting Req: No Auth found.`)
    }
    next();
  }
}
