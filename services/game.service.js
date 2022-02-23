import PropertyGuardService from './propertyGuard.service.js';
import PlayerNameRotationService from './playerNameRotation.service.js';

export default class GameService {
  static create(playerNames) {
    PropertyGuardService.throwErrorIfNoArrayOfStrings(playerNames);

    const playerStats = {};

    playerNames.forEach((playerName) => {
      const newPlayerStats = {
        sets: 0,
        legs: 0,
        required: 501,
        throws: [],
        average: '-',
        highestScore: '-',
        highestFinish: '-',
        currentLegThrows: [],
      };

      playerStats[playerName] = newPlayerStats;
    });

    const game = {
      playerNames,
      playerStats,
    };

    return game;
  }

  static buildPlayerStatsArray(game) {
    GameService.validate(game);

    const { playerNames, playerStats } = game;
    const playerStatsArray = [];

    playerNames.forEach((playerName) => {
      const currentPlayerStats = playerStats[playerName];

      const stats = {
        name: playerName,
        sets: currentPlayerStats.sets,
        legs: currentPlayerStats.legs,
        required: currentPlayerStats.required,
        throws: currentPlayerStats.throws,
        average: currentPlayerStats.average,
        highestScore: currentPlayerStats.highestScore,
        highestFinish: currentPlayerStats.highestFinish,
      };

      if (stats.average !== '-') {
        stats.average = Number.parseFloat(stats.average).toFixed(2);
      }

      playerStatsArray.push(stats);
    });

    return playerStatsArray;
  }

  static getNextPlayer(game) {
    GameService.validate(game);

    let totalSets = 0;
    let totalLegs = 0;

    game.playerNames.forEach((playerName) => {
      const playerStats = game.playerStats[playerName];

      totalSets += playerStats.sets;
      totalLegs += playerStats.legs;
    });

    const playersOrder = PlayerNameRotationService.rotate(game.playerNames, totalSets, totalLegs);

    let currentNextPlayer = playersOrder[0];
    let currentNextPlayerThrows = game.playerStats[currentNextPlayer].currentLegThrows.length;

    for (let i = 1; i < playersOrder.length; i += 1) {
      const tempPlayer = playersOrder[i];
      const tempPlayerThrows = game.playerStats[tempPlayer].currentLegThrows.length;

      if (tempPlayerThrows < currentNextPlayerThrows) {
        currentNextPlayer = tempPlayer;
        currentNextPlayerThrows = tempPlayerThrows;
      }
    }

    return currentNextPlayer;
  }

  static submitScore(game, score) {
    GameService.validate(game);
    PropertyGuardService.throwErrorIfNoNumber(score);

    if (score < 0 || score > 180) {
      return game;
    }

    const nextPlayer = GameService.getNextPlayer(game);
    const playerStats = game.playerStats[nextPlayer];

    if (score > playerStats.required) {
      return GameService.submitScore(game, 0);
    }

    playerStats.required -= score;
    playerStats.throws.push(score);
    playerStats.currentLegThrows.push(score);

    if (playerStats.highestScore === '-' || playerStats.highestScore < score) {
      playerStats.highestScore = score;
    }

    let sum = 0;
    playerStats.throws.forEach((value) => {
      sum += value;
    });

    playerStats.average = sum / playerStats.throws.length;

    if (playerStats.required === 0) {
      if (playerStats.highestFinish === '-' || playerStats.highestFinish < score) {
        playerStats.highestFinish = score;
      }

      playerStats.legs += 1;

      let setFinished = false;

      if (playerStats.legs === 3) {
        setFinished = true;
        playerStats.sets += 1;
      }

      game.playerNames.forEach((playerName) => {
        const gameCopy = game;

        gameCopy.playerStats[playerName].required = 501;
        gameCopy.playerStats[playerName].currentLegThrows = [];

        if (setFinished) {
          gameCopy.playerStats[playerName].legs = 0;
        }
      });
    }

    return game;
  }

  static validate(game) {
    PropertyGuardService.throwErrorIfUndefined(game);
    PropertyGuardService.throwErrorIfNoObject(game);

    const { playerNames, playerStats } = game;

    PropertyGuardService.throwErrorIfNoArrayOfStrings(playerNames);
    PropertyGuardService.throwErrorIfNoObject(playerStats);
  }
}
