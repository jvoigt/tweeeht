import { Injectable } from '@nestjs/common';

@Injectable()
export class OutputService {

    send(message:any){
        console.log("SEND:", message);
    }
}
