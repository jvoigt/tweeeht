import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from 'config/config.service';
import { TweeehtMessage } from 'tweeht-message.interface';
import * as Twit from 'twit';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TWITCONST } from 'const/twit.const';
import { Poster } from 'output/poster.interface';

@Injectable()
export class TwitService implements Poster {
  moduleName = 'TWIT';
  private twitCon: Twit;

  constructor(config: ConfigService) {
    const twitOptions = {
      access_token: config.get('TWITTER_ACCESS_TOKEN'),
      access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET'),
      consumer_key: config.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    };
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

      if (TWITCONST.bypass_upload) {
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

  private postTweet(uploadedMessage: TweeehtMessage): Observable<any> {
    console.debug('TWIT-POST', uploadedMessage);

    // if the useage of twitter is bypassed just return BPASS
    if (TWITCONST.bypass_post) {
      console.debug('TWIT-POST-BYPASS:', uploadedMessage);
      return of('BYPASS');
    } else {
      this.twitCon.post(
        'statuses/update',
        { status: uploadedMessage.text, media_ids: [uploadedMessage.imageUrl] },
        (err, data, response) => {
          if (err) {
            console.debug('TWIT-POST-ERR:', err);
            return throwError(err);
          } else {
            console.debug('TWIT-POST-DATA:', data);
            of(data);
          }
        },
      );
    }
  }
}
