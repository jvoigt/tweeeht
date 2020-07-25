import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AdminAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const validation = this.adminAuthService.validateAdminUserbyLogin(
      username,
      password,
    );

    if (!validation) {
      throw new UnauthorizedException();
    }
    return validation;
  }
}
