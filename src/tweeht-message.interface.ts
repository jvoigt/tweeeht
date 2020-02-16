export interface TweeehtMessage {
  text: string;
  imageUrl?: string;
  status?: TweeehtMessageStatus;
  extRef?: any;
}

export enum TweeehtMessageStatus {
  BYPASS = 'B',
  DONE = 'D',
  ERROR = 'E',
  UNKNOWN = 'U',
}
