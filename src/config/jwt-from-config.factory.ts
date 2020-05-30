import { ConfigModule } from './config.module';
import { LoggerModule } from 'logger/logger.module';
import { TweehtLogger } from 'logger/tweeht-logger';
import { ConfigService } from './config.service';

export const jwtSecretFromConfigFactory = {
    imports: [ConfigModule, LoggerModule],
    inject: [ConfigService, TweehtLogger],
    provide: 'JWT_SECRET_FROM_CONFIG',
    useFactory: async (configService: ConfigService, logger: TweehtLogger) => {
        logger.setContext('JWT_SECRET_FROM_CONFIG_FACTORY');
        const secret = configService.get('JWT_SECRET');
        if (!secret) {
            logger.error('No JWT_SECRET Found. Add to env')
            throw new Error('No JWT Secret (X╭╮X)')
        }
        return secret;
    }
};