import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';
import { AdminUser } from './admin-user.interface';

@Injectable()
export class AdminAuthService {

    private admin: AdminUser;

    constructor(
        private config: ConfigService,
        private logger: TweehtLogger,
    ) {
        this.logger.setContext('ADMINAUTH');

        const username = this.config.get('ADMIN_USERNAME') || 'admin';
        const password = this.config.get('ADMIN_PASSWORD') || 'admin';
        const token = this.config.get('ADMIN_TOKEN') || 'changemelater';

        this.logger.log(`${(username ? 'Found Admin Username.' : 'No Admin Username found, reverting to default.')}`);
        this.logger.log(`${(password ? 'Found Admin Password.' : 'No Admin Password found, reverting to default.')}`);
        this.logger.log(`${(password ? 'Found Admin Token.' : 'No Admin Token found, reverting to default.')}`);

        this.admin = {
            password,
            token,
            username,
        };
    }

    async validateAdminUserbyLogin(
        username: string,
        password: string,
    ): Promise<boolean> {

        const validation = username && password &&
            this.admin.password === password &&
            this.admin.username === username;

        this.logger.debug(`Admin Access for ${username} ${validation ? 'granted.' : 'denied.'}`);

        return validation;
    }

    async validateAdminUserbyToken(
        token: string,
    ): Promise<boolean> {

        const validation = token && this.admin.token &&
            this.admin.token === token;
        this.logger.debug(`Admin Access by token ${validation ? 'granted.' : 'denied.'}`);

        return validation;
    }
}
