import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { TWITCONST } from 'const/twit.const';
import { TweehtLogger } from 'logger/tweeht-logger';
import { Poster } from 'output/poster.interface';
import * as path from 'path';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TweeehtMessage, TweeehtMessageStatus } from 'tweeht-message.interface';
import * as Twit from 'twit';

@Injectable()
export class TwitService implements Poster {
  moduleName = 'TWIT';
  private twitCon: Twit;

  private bypassMedia: boolean;
  private bypassPost: boolean;

  constructor(config: ConfigService, private readonly logger: TweehtLogger) {
    this.logger.setContext('TWIT');
    const twitOptions = {
      access_token: config.get('TWITTER_ACCESS_TOKEN'),
      access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET'),
      consumer_key: config.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    };

    // if value is set in config parse for true/false else use default
    this.bypassMedia = config.get('TWITTER_BYPASS')
      ? JSON.parse(config.get('TWITTER_BYPASS')) || TWITCONST.bypass_upload
      : TWITCONST.bypass_upload;

    this.bypassPost = config.get('TWITTER_BYPASS')
      ? JSON.parse(config.get('TWITTER_BYPASS')) || TWITCONST.bypass_post
      : TWITCONST.bypass_post;

    this.twitCon = new Twit(twitOptions);
  }

  post(message: TweeehtMessage): Observable<TweeehtMessage> {
    this.logger.debug(`GOT ${message.text}`);

    return this.uploadMedia(message).pipe(
      switchMap((uploadedMessage: TweeehtMessage) => {
        return this.postTweet(uploadedMessage);
      }),
    );
  }

  private uploadMedia(message: TweeehtMessage): Observable<TweeehtMessage> {
    if (!message.imageUrl) {
      this.logger.debug(`NO MEDIA: ${message.text}`);
      return of(message);
    } else {
      this.logger.debug(`MEDIA: ${message.imageUrl}`);
      const mediaFilePath = path.join(
        __dirname,
        '../../../' + message.imageUrl,
      );
      if (this.bypassMedia) {
        this.logger.debug(`UPLOAD-BYPASS ${message.text}`);
        return of(message);
      } else {
        this.twitCon.postMediaChunked(
          {
            file_path: mediaFilePath,
          },
          (err: Error, data: Twit.Response & { media_id_string }, response) => {
            if (err) {
              this.logger.debug(`UPLOAD-ERR: ${data.media_id_string}`);
              return throwError(err);
            } else if (data && data.media_id_string) {
              this.logger.debug(`UPLOAD-DATA: ${data.media_id_string}`);
              message.imageUrl = data.media_id_string;
              return of(message);
            }
          },
        );
      }
    }
  }

  private postTweet(
    uploadedMessage: TweeehtMessage,
  ): Observable<TweeehtMessage> {
    this.logger.debug(`POST ${uploadedMessage.text}`);

    // use Replace in case the emit happens to fast
    const postedTweet$ = new ReplaySubject<TweeehtMessage>(1);

    // if the useage of twitter is bypassed just return BYPASS
    if (this.bypassPost) {
      this.logger.debug(`POST BYPASS ${uploadedMessage.text}`);
      uploadedMessage.status = TweeehtMessageStatus.BYPASS;
      postedTweet$.next(uploadedMessage);
    } else {
      // TODO: Refactor to helper
      const twitParams: Twit.Params = { status: uploadedMessage.text };

      if (!this.bypassMedia && uploadedMessage.imageUrl) {
        twitParams.media_ids = [uploadedMessage.imageUrl];
      }

      this.logger.debug(`POST BODY: ${twitParams.toString()}`);
      this.twitCon.post(
        'statuses/update',
        twitParams,
        (err: Error, result: Twit.Response & Twit.Twitter.Status, response) => {
          if (err) {
            this.logger.debug(`POST ERR: ${err}`);

            uploadedMessage.status = TweeehtMessageStatus.ERROR;
            uploadedMessage.extRef = err;

            postedTweet$.error(uploadedMessage);
          } else {
            this.logger.debug(`POST RESULT: ${result}`);
            uploadedMessage.status = TweeehtMessageStatus.DONE;
            uploadedMessage.extRef = result.id;
            postedTweet$.next(uploadedMessage);
          }
        },
      );
    }

    return postedTweet$.asObservable();
  }
}
