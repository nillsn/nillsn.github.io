import { assert } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import GameService from '../../../services/game.service.js';

TestCaller.call('GameService', 'submitScore', () => {
  it('should update first players playerStats after the first throw', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    game = GameService.submitScore(game, 180);

    const playerStats = game.playerStats[players[0]];

    const { sets, legs, required } = playerStats;
    const { throws, average, highestScore } = playerStats;
    const { highestFinish } = playerStats;

    assert.equal(sets, 0);
    assert.equal(legs, 0);
    assert.equal(required, 321);
    assert.deepEqual(throws, [180]);
    assert.equal(average, 180);
    assert.equal(highestScore, 180);
    assert.equal(highestFinish, '-');
  });

  it('should update second players playerStats after the second throw', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 101);

    const playerStats = game.playerStats[players[1]];

    const { sets, legs, required } = playerStats;
    const { throws, average, highestScore } = playerStats;
    const { highestFinish } = playerStats;

    assert.equal(sets, 0);
    assert.equal(legs, 0);
    assert.equal(required, 400);
    assert.deepEqual(throws, [101]);
    assert.equal(average, 101);
    assert.equal(highestScore, 101);
    assert.equal(highestFinish, '-');
  });

  it('should update first players playerStats after a nine-darter', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    const playerStats = game.playerStats[players[0]];

    const { sets, legs, required } = playerStats;
    const { throws, average, highestScore } = playerStats;
    const { highestFinish } = playerStats;

    assert.equal(sets, 0);
    assert.equal(legs, 1);
    assert.equal(required, 501);
    assert.deepEqual(throws, [180, 180, 141]);
    assert.equal(average, 167);
    assert.equal(highestScore, 180);
    assert.equal(highestFinish, 141);
  });

  it('should update first players playerStats after playing 3 legs', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    // Leg 1 - Player 1 Wins
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    // Leg 2 - Player 2 Wins
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    // Leg 3 - Player 2 Wins
    game = GameService.submitScore(game, 50);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    const firstPlayersStats = game.playerStats[players[0]];

    const { sets, legs, required } = firstPlayersStats;
    const { throws, highestScore, highestFinish } = firstPlayersStats;

    assert.equal(sets, 0);
    assert.equal(legs, 1);
    assert.equal(required, 501);
    assert.deepEqual(throws, [180, 180, 141, 100, 100, 50, 100, 100]);
    assert.equal(highestScore, 180);
    assert.equal(highestFinish, 141);
  });

  it('should update second players playerStats after playing 3 legs', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    // Leg 1 - Player 1 Wins
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    // Leg 2 - Player 2 Wins
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    // Leg 3 - Player 2 Wins
    game = GameService.submitScore(game, 50);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    const firstPlayersStats = game.playerStats[players[1]];

    const { sets, legs, required } = firstPlayersStats;
    const { throws, highestScore, highestFinish } = firstPlayersStats;

    assert.equal(sets, 0);
    assert.equal(legs, 2);
    assert.equal(required, 501);
    assert.deepEqual(throws, [100, 100, 180, 180, 141, 180, 180, 141]);
    assert.equal(highestScore, 180);
    assert.equal(highestFinish, 141);
  });

  it('should update second players playerStats after winning the first set', () => {
    const players = ['Kaddi', 'Pelle'];
    let game = GameService.create(players);

    // Leg 1 - Player 2 Wins
    game = GameService.submitScore(game, 80);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 141);
    game = GameService.submitScore(game, 141);

    // Leg 2 - Player 2 Wins
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    // Leg 3 - Player 2 Wins
    game = GameService.submitScore(game, 50);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 180);
    game = GameService.submitScore(game, 100);
    game = GameService.submitScore(game, 141);

    const firstPlayersStats = game.playerStats[players[1]];

    const { sets, legs, required } = firstPlayersStats;
    const { throws, highestScore, highestFinish } = firstPlayersStats;

    assert.equal(sets, 1);
    assert.equal(legs, 0);
    assert.equal(required, 501);
    assert.deepEqual(throws, [180, 180, 141, 180, 180, 141, 180, 180, 141]);
    assert.equal(highestScore, 180);
    assert.equal(highestFinish, 141);
  });
});
