import { Injectable } from '@nestjs/common';
import { TweeehtMessage } from 'src/content/tweeht-message.interface';
import { TwitService } from '../twit/twit.service';

@Injectable()
export class OutputService {

    constructor(private twitService: TwitService) { }

    send(message: TweeehtMessage) {
        console.log("SEND:", message);
        this.twitService.post(message).subscribe(result => {
            console.log("SENT:", result);
        })
    }
}
