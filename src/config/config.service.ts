
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor(filePath: string) {
        console.log(process.env.NODE_ENV);
        this.envConfig = dotenv.parse(fs.readFileSync('env/' + filePath))
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}