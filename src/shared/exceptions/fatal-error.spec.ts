import { FatalError } from './fatal-error';

describe('FatalError', () => {
  it('should be defined', () => {
    expect(new FatalError()).toBeDefined();
  });
});
