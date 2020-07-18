import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private logger: TweehtLogger,
  ) {
    super();
    this.logger.setContext('ROLES_GUARD');
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      this.logger.warn(`No Roles for Guarding set. Denied!`);
      return false;
    }

    if (!user) {
      this.logger.warn(`No User for Guarding found. Denied!`);
      throw new UnauthorizedException();
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (!(user.roles && hasRole())) {
      this.logger.warn(`No Matching Roles for Guarding found. Denied!`);
      throw new ForbiddenException('Forbidden');
    }

    const guardJudgement = user && user.roles && hasRole();
    this.logger.debug(
      `Guarding ${context.getClass().name} / ${context.getHandler().name}: ${
        guardJudgement ? 'granted' : 'denied'
      }.`,
    );

    return guardJudgement;
  }
}
