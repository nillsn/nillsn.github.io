import { assert } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import GameService from '../../../services/game.service.js';

TestCaller.call('GameService', 'getNextPlayer', () => {
  it('should return the first players name after the game has been created', () => {
    const playerNames = ['Pelle', 'Kaddi'];
    const game = GameService.create(playerNames);

    const nextPlayer = GameService.getNextPlayer(game);

    assert.equal(nextPlayer, playerNames[0]);
  });

  it('should return the second players name after the first throw has been submitted', () => {
    const playerNames = ['Pelle', 'Kaddi'];
    let game = GameService.create(playerNames);

    game = GameService.submitScore(game, 180);

    const nextPlayer = GameService.getNextPlayer(game);

    assert.equal(nextPlayer, playerNames[1]);
  });

  it('should return the second players name after the second throw has been submitted', () => {
    const playerNames = ['Pelle', 'Kaddi'];
    let game = GameService.create(playerNames);

    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);

    const nextPlayer = GameService.getNextPlayer(game);

    assert.equal(nextPlayer, playerNames[0]);
  });

  it('should return the second players name after the first player wins the first leg', () => {
    const playerNames = ['Pelle', 'Kaddi'];
    let game = GameService.create(playerNames);

    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 141);

    const nextPlayer = GameService.getNextPlayer(game);

    assert.equal(nextPlayer, playerNames[1]);
  });

  it('should return the second players name after the second player wins the first leg', () => {
    const playerNames = ['Pelle', 'Kaddi'];
    let game = GameService.create(playerNames);

    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 140);
    game = GameService.submitScore(game, 141);

    const nextPlayer = GameService.getNextPlayer(game);

    assert.equal(nextPlayer, playerNames[1]);
  });
});
