import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AUTHCONST } from 'const/auth.const';
import { TweehtLogger } from 'logger/tweeht-logger';
import { JwtTokenDto } from './dto/jwt-token-messagen.dto';

@Injectable()
export class AuthService {

    constructor(
        private logger: TweehtLogger,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        this.logger.setContext('AUTH');
    }

    async login(loginAttempt: LoginUserDto) {
        this.logger.debug(`Login-Attempt for ${loginAttempt.username}`);
        const userToAttempt = await this.usersService.findOneByUsername(loginAttempt.username);

        if (userToAttempt) {
            const isMatch = await this.usersService.checkPassword(loginAttempt.password, userToAttempt);
            if (isMatch) {
                this.logger.log(`Login-Attempt for ${loginAttempt.username}: GRANTED!`);
                // If there is a successful match, generate a JWT for the user
                return this.createJwtPayload(userToAttempt);
            }
        }

        this.logger.warn(`Login-Attempt for ${loginAttempt.username}: DENIED!`);
        throw new UnauthorizedException();
    }

    async validateUserByJwt(payload: JwtPayload) {
        this.logger.debug(`Validation-Attempt for ${payload.username}`);

        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersService.findOneByUsername(payload.username);

        this.logger.debug(`Valdidation-Attempt for ${payload.username} ${user ? 'granted.' : 'denied.'}`);
        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user): JwtTokenDto {
        const data: JwtPayload = {
            roles: user.roles,
            username: user.username,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: AUTHCONST.expiry,
            roles: user.roles,
            token: jwt,
        };

    }

}
