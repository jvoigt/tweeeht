// TODO: move this to an exceptionfilter

export class TweeehtError extends Error {
  constructor(message?: string) {
    super(`[TweeehtError]: ${message ? message : 'Unspecified'}`);
  }
}
