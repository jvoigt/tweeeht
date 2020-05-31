import { Injectable } from '@nestjs/common';
import {
    MongooseModuleOptions, MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from 'config/config.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    constructor(
        private config: ConfigService,
        private logger: TweehtLogger,
    ) {
        this.logger.setContext('MongooseConfigService');

    }

    createMongooseOptions(): MongooseModuleOptions {
        const dbHost = this.config.get('MONGODB_HOST')
        const dbName = this.config.get('MONGODB_DATABASE')
        const dbUser = this.config.get('MONGO_USERNAME')
        const dbPassword = this.config.get('MONGO_PASSWORD')
        if (!dbHost && !dbName && !dbUser && !dbPassword) {
            throw new Error('')
        }
        this.logger.log(
            `Found  MongoHostConfig: ${dbHost}. Looking for dataase named ${dbName}.`
        )
        this.logger.log(
            `Found ${dbUser ? 'a ' : 'no '} MongoUser ${dbPassword ? 'with' : 'without'} a Password.`
        )
        return {
            uri: `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
        };
    }
}
