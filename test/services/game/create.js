import { assert } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import GameService from '../../../services/game.service.js';

TestCaller.call('GameService', 'create', () => {
  it('should return an object with the property playerNames that is an array with the playernames', () => {
    const expectedPlayerNames = ['Kaddi', 'Pelle'];
    const game = GameService.create(expectedPlayerNames);

    const { playerNames } = game;

    assert.equal(playerNames, expectedPlayerNames);
  });

  it('should return an object with the property playerStats that is an object with the starting playerStats for each player', () => {
    const expectedPlayerNames = ['Kaddi', 'Pelle'];
    const game = GameService.create(expectedPlayerNames);

    const { playerStats } = game;

    expectedPlayerNames.forEach((player) => {
      const currentPlayerStats = playerStats[player];
      const {
        sets, legs, required,
        throws, average, highestScore,
        highestFinish, currentLegThrows,
      } = currentPlayerStats;

      assert.equal(sets, 0);
      assert.equal(legs, 0);
      assert.equal(required, 501);
      assert.deepEqual(throws, []);
      assert.equal(average, '-');
      assert.equal(highestScore, '-');
      assert.equal(highestFinish, '-');
      assert.deepEqual(currentLegThrows, []);
    });
  });
});
