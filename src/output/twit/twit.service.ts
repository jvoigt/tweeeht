import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';

@Injectable()
export class TwitService {

    private twitCon: Twit;

    constructor() {/*
        this.twitCon = new Twit({

        })*/

        /*        this.twitCon.post('statuses/update', { status: 'Achtung!!! ich teste mal wieder....' }, (err, data, response) => {
                    console.log("TWIT-Data:", data)
                    console.log("TWIT-Err:", err)
                    console.log("TWIT-Data:", data)
                })
                */
    }
}
