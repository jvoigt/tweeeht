import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { Messager } from 'content/messager.interface';
import * as fs from 'fs';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Observable, of } from 'rxjs';
import { TweeehtMessage } from 'tweeht-message.interface';

@Injectable()
export class StaticService implements Messager {
  moduleName = 'STATIC';

  private lines: string[];
  private medias: string[];

  constructor(
    private config: ConfigService,
    private readonly logger: TweehtLogger,
  ) {
    this.logger.setContext(this.moduleName);

    const jsonPath = this.config.get('STATIC_JSON');
    this.logger.debug(`Looking for JSON: ${jsonPath}`);

    const rawContent = fs.readFileSync(jsonPath);
    // Define to JSON type
    const jsonContent = JSON.parse(rawContent.toString());
    this.logger.debug(`Looking for JSON: ${jsonPath}`);

    if (jsonContent.lines) {
      this.lines = jsonContent.lines;
    }

    if (jsonContent.medias) {
      this.medias = jsonContent.medias;
    }
  }

  getMessage(): Observable<TweeehtMessage> {
    const message: TweeehtMessage = {
      text: '',
    };

    if (this.lines) {
      const id = Math.floor(Math.random() * this.lines.length);
      message.text = this.lines[id];
      this.logger.debug(`Line: ${id} / ${this.lines.length}`);
    }

    if (this.medias) {
      const id = Math.floor(Math.random() * this.medias.length);
      message.imageUrl = this.medias[id];
      this.logger.debug(`Media: ${id} / ${this.medias.length}`);
    }

    this.logger.log(`Messages: ${message.text} ${message.imageUrl}`);
    return of(message);
    // return throwError(new Error('Not yet implemented'));
  }
}
