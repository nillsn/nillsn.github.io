import { assert } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import GameService from '../../../services/game.service.js';

TestCaller.call('GameService', 'buildPlayerStatsArray', () => {
  it('should be tests implemented', () => {
    const playerNames = ['Kaddi', 'Pelle'];
    const game = GameService.create(playerNames);

    const playerStatsArray = GameService.buildPlayerStatsArray(game);

    for (let i = 0; i < playerNames.length; i += 1) {
      const playerStats = playerStatsArray[i];
      assert.equal(playerStats.name, playerNames[i]);
      assert.equal(playerStats.sets, 0);
      assert.equal(playerStats.legs, 0);
      assert.equal(playerStats.required, 501);
      assert.deepEqual(playerStats.throws, []);
      assert.equal(playerStats.highestScore, '-');
      assert.equal(playerStats.highestFinish, '-');
    }
  });
});
