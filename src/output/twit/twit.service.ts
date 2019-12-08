import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from 'src/config/config.service';
import { TweeehtMessage } from 'src/content/tweeht-message.interface';
import * as Twit from 'twit';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TwitService {

    private twitCon: Twit;

    constructor(config: ConfigService) {

        const twitOptions = {
            consumer_key: config.get('TWITTER_CONSUMER_KEY'),
            consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
            access_token: config.get('TWITTER_ACCESS_TOKEN'),
            access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET'),

        };
        this.twitCon = new Twit(twitOptions);
    }

    post(message: TweeehtMessage) {
        console.log("TWIT GOT", message)

        return this.uploadMedia(message).pipe(
            switchMap(
                (uploadedMessage) => {
                    console.log("TWIT POST", uploadedMessage)
                    const status$ = new Subject<any>();

                    this.twitCon.post('statuses/update', { status: uploadedMessage.text, media_ids: [uploadedMessage.imageUrl] }, (err, data, response) => {
                        console.log("TWIT-Data:", data)
                        console.log("TWIT-Err:", err)
                        console.log("TWIT-Data:", data)
                        if (err) {
                            status$.error(err)
                        } else {
                            status$.next(data)
                        }
                    })
                    return status$;
                }
            )
        )
    }

    private uploadMedia(message: TweeehtMessage): Observable<TweeehtMessage> {

        const upload$ = new Subject<TweeehtMessage>();

        if (!message.imageUrl) {
            console.log("TWIT- NO MEDIA:", message)

            upload$.next(message)
        } else {
            console.log("TWIT-MEDIA:", message.imageUrl)
            var mediaFilePath = path.join(__dirname, '../../../' + message.imageUrl);

            this.twitCon.postMediaChunked(
                {
                    file_path: mediaFilePath,
                }, ((err: Error, data: Twit.Response, response) => {
                    console.log("TWIT-upload:", data, err)
                    if (err) {
                        upload$.error(err)
                    } else if (data && data['media_id_string']
                    ) {
                        console.log("TWIT-uplaod_data:", data['media_id_string'])
                        message.imageUrl = data['media_id_string']
                        upload$.next(message)
                    }
                })
            )

        }
        return upload$.asObservable();
    }

}
