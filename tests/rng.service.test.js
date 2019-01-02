import { getKeySerialNumber, getWinningKey, keysLength } from '../rng.service';

const config = {
  serverSeed: '0x040c6d229d7b1e14b13c17a23aa4e33bdd28a81f',
  clientSeed: '0x7091778a4871f92ce0a39d1c4135a550462b63b66d5fb39f3aca80a1831a1385',
  keyCount: keysLength,
};

describe('Winning key', () => {
  it('shows total participant key count', () => {
    expect(keysLength).toEqual(19540);
  });
  it('finds winning key index', () => {
    const winningKeyIndex = getKeySerialNumber(config.clientSeed, config.serverSeed, config.keyCount);
    expect(winningKeyIndex).toEqual(11089);
  });
  it('finds winning key', () => {
    const key = getWinningKey(config.clientSeed, config.serverSeed, config.keyCount);
    expect(key.serialNumber).toEqual(11089);
    expect(key.uniqueKeyId).toEqual('5c1ec63615a98a1faaddead1');
    expect(key.createdAt).toEqual('2018-12-22T23:18:14.431Z');
  });
});
