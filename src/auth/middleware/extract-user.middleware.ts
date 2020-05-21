import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TweehtLogger } from 'logger/tweeht-logger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { JwtPayload } from 'auth/interfaces/jwt-payload.interface';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
    constructor(
        private logger: TweehtLogger,
        private jwtService: JwtService,
        private userService: UsersService,
    ) {
        this.logger.setContext('EXTRACTUSER')
    }

    async use(req: Request, res: Response, next: Function) {
        console.log("ExtractUserMiddleware!!!!", req.headers.authorization)
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            const payload: JwtPayload = this.jwtService.verify(token);
            req.user = await this.userService.findOneByUsername(payload.username)
            console.log("ExtractUserMiddleware!!!!- USER", req.user)
        }
        next();
    }
}

