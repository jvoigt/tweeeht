import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from 'config/config.service';
import { TweeehtMessage, TweeehtMessageStatus } from 'tweeht-message.interface';
import * as Twit from 'twit';
import { Observable, of, throwError, Subject, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TWITCONST } from 'const/twit.const';
import { Poster } from 'output/poster.interface';

@Injectable()
export class TwitService implements Poster {
  moduleName = 'TWIT';
  private twitCon: Twit;

  private bypassMedia: boolean;
  private bypassPost: boolean;

  constructor(config: ConfigService) {
    const twitOptions = {
      access_token: config.get('TWITTER_ACCESS_TOKEN'),
      access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET'),
      consumer_key: config.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    };

    // if value is set in config parse for true/false else use default
    this.bypassMedia = config.get('TWITTER_BYPASS')
      ? JSON.parse(config.get('TWITTER_BYPASS'))
      : TWITCONST.bypass_upload;

    this.bypassPost = config.get('TWITTER_BYPASS')
      ? JSON.parse(config.get('TWITTER_BYPASS'))
      : TWITCONST.bypass_post;

    this.twitCon = new Twit(twitOptions);
  }

  post(message: TweeehtMessage): Observable<TweeehtMessage> {
    console.debug('TWIT GOT', message);

    return this.uploadMedia(message).pipe(
      switchMap((uploadedMessage: TweeehtMessage) => {
        return this.postTweet(uploadedMessage);
      }),
    );
  }

  private uploadMedia(message: TweeehtMessage): Observable<TweeehtMessage> {
    if (!message.imageUrl) {
      console.debug('TWIT- NO MEDIA:', message);
      return of(message);
    } else {
      console.debug('TWIT-MEDIA:', message.imageUrl);
      const mediaFilePath = path.join(
        __dirname,
        '../../../' + message.imageUrl,
      );

      if (this.bypassMedia) {
        console.debug('TWIT-UPLOAD-BYPASS', message);
        return of(message);
      } else {
        this.twitCon.postMediaChunked(
          {
            file_path: mediaFilePath,
          },
          (err: Error, data: Twit.Response & { media_id_string }, response) => {
            console.debug('TWIT-UPLOAD:', response, data, err);
            if (err) {
              console.debug('TWIT-UPLOAD-ERR:', data.media_id_string);
              return throwError(err);
            } else if (data && data.media_id_string) {
              console.debug('TWIT-UPLOAD-DATA:', data.media_id_string);
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
    console.debug('TWIT-POST', uploadedMessage);

    // use Replace in case the emit happens to fast
    const postedTweet$ = new ReplaySubject<TweeehtMessage>(1);

    // if the useage of twitter is bypassed just return BYPASS
    if (this.bypassPost) {
      console.debug('TWIT-POST-BYPASS:', uploadedMessage);
      uploadedMessage.status = TweeehtMessageStatus.BYPASS;
      postedTweet$.next(uploadedMessage);
    } else {
      // TODO: Refactor to helper
      const twitParams: Twit.Params = { status: uploadedMessage.text };

      if (uploadedMessage.imageUrl) {
        twitParams.media_ids = [uploadedMessage.imageUrl];
      }

      console.debug('TWIT-POST body:', uploadedMessage);
      this.twitCon.post(
        'statuses/update',
        twitParams,
        (err: Error, result: Twit.Response & Twit.Twitter.Status, response) => {
          if (err) {
            console.debug('TWIT-POST-ERR:', err);
            uploadedMessage.status = TweeehtMessageStatus.ERROR;
            uploadedMessage.extRef = err;

            postedTweet$.error(uploadedMessage);
          } else {
            console.debug('TWIT-POST-DATA:', result);
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
