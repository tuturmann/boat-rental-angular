import { ClientIdToNamePipe } from './client-id-to-name-pipe';

describe('ClientIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ClientIdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
