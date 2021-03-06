import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AdminAuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    const validation = this.adminAuthService.validateAdminUserbyToken(token);

    if (!validation) {
      throw new UnauthorizedException();
    }
    return validation;
  }
}
