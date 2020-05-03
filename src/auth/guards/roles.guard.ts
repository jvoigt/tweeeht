import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector, private logger: TweehtLogger) {
        super();
        this.logger.setContext('ROLES');
    }

    handleRequest(err, user, info: Error, context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if no role is provided/ every role is '' then continue without any checks
        this.logger.debug(`Guarding by Role: "${roles.join('", "')}\" - Found "${user.roles.join('", "')}"`);

        if (!roles || '' === roles.join()) {
            return true;
        }

        const hasRole = () => user.roles.some((role) => roles.includes(role));
        if (!user) {
            throw new UnauthorizedException();
        }
        if (!(user.roles && hasRole())) {
            throw new ForbiddenException('Forbidden');
        }
        return user && user.roles && hasRole();
    }
}