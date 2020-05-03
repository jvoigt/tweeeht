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
        // MONGODB_DATABASE = tweeeht
        // MONGO_INITDB_ROOT_USERNAME = root
        // MONGO_INITDB_ROOT_PASSWORD = changeme
        return {
            uri: 'mongodb://localhost:27017/tweeeht',
        };
    }
}
