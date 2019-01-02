const MersenneTwister = require('mersennetwister');
const keys = require('./list-of-keys');

/**
 * Generates random number which will be used as index for finding winning key.
 * @param clientSeed
 * @param serverSeed
 * @param keyCount
 * @returns {number}
 */
exports.getKeySerialNumber = (clientSeed, serverSeed, keyCount) => {
  clientSeed = clientSeed.replace('0x', '');
  serverSeed = serverSeed.replace('0x', '');
  const clSeedSplitted = clientSeed.match(/.{1,6}/g);
  const srvSeedSplitted = serverSeed.match(/.{1,6}/g);
  const seedsCombined = srvSeedSplitted.concat(clSeedSplitted);
  for (let i = 0; i < seedsCombined.length; i++) {
    seedsCombined[i] = parseInt(seedsCombined[i], 16);
  }

  const mt = new MersenneTwister();
  mt.seedArray(seedsCombined);
  return (mt.int() % (keyCount + 1)) % keyCount;
};

/**
 * Returns winning key object.
 * @param clientSeed
 * @param serverSeed
 * @param keyCount
 * @returns {*}
 */
exports.getWinningKey = (clientSeed, serverSeed, keyCount) => {
  const keyNumber = this.getKeySerialNumber(clientSeed, serverSeed, keyCount);
  return keys[keyNumber];
};

exports.keysLenght = keys.length;
