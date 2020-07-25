import { TweeehtError } from './tweeeht-error';

export class FatalError extends TweeehtError {
  constructor(message?: string) {
    super(
      `FatalError: ${
        message ? message : 'Unspecified'
      } \n(X╭╮X) Now i an going to die!`,
    );
  }
}
