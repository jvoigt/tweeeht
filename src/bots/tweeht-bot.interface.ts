/**
 * this is the main defintion of a BotObj
 * 
 * may be use everywhere
 */
export class TweeehtBot {
  /** primary Id */
  id?: string;
  /**usernames of owners */
  owners: string[];
  /** nice name so you can find your bot */
  name: string;
  sheduler?: any; //FIXME: add proper type
  output?: any;  //FIXME: add proper type
  content?: any; //FIXME: add proper type
}

// class TweeehtUser {
//   username: string;
//   password: string;
//   roles: ('user' | 'admin')[];
// }

// class TweeehtBot {
//   name: string;
//   owners: TweeehtUser[];
//   output: {
//     twitter_config: {
//       handle: string;
//       consumer_key: string;
//       consumer_secret: string;
//       access_token: string;
//       access_token_secret: string;
//     };
//   };
//   sheduler: {
//     type: string; // id??
//     params: any; // depending on the type
//   };
//   content: [
//     {
//       head: {};
//       element: {
//         type: string; // id??
//         params: any; // depending on the type
//       };
//       tail: {};
//     };
//   ];
// }
