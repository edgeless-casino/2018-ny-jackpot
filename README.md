# 2018 NY Jackpot fairness
[![Build Status](https://travis-ci.org/edgeless-casino/2018-ny-jackpot.svg?branch=master)](https://travis-ci.org/edgeless-casino/2018-ny-jackpot)

Here you can check fairness of edgeless jackpot winner.

You can check it in from this repository source code auto-generated github page [https://edgeless-casino.github.io/2018-ny-jackpot](https://edgeless-casino.github.io/2018-ny-jackpot) 
or run this code in your computer:

    yarn install
    yarn run
    open http://localhost:3000


Most important code in this repository is in `rng.service.js` file.

    const MersenneTwister = require('mersennetwister');
    
    function getKeySerialNumber(clientSeed, serverSeed, keyCount) {
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
    }

This code snippet generates random number using client seed, server seed and total key count of 
jackpot participants.

This number then is are used as index to get winning key object from 
keys array.

All keys are included in json file `list-of-keys.json`.
