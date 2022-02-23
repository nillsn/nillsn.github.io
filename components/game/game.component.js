import GameService from '../../services/game.service.js';

export default class GameComponent {
  static template = './components/game/game.component.html';

  constructor() {
    const id = GameComponent.getGameId();
    const stringifiedGame = localStorage.getItem(id);

    if (stringifiedGame === null) {
      throw new Error('Game ID is invalid!');
    }

    this.game = JSON.parse(stringifiedGame);
    this.updateComponent();
  }

  static getGameId() {
    const urlParameters = new URLSearchParams(window.location.search);
    const id = urlParameters.get('id');

    if (id === null) {
      throw new Error('Game ID is null!');
    }

    return id;
  }

  updateComponent() {
    this.playerStats = GameService.buildPlayerStatsArray(this.game);
    this.nextPlayer = GameService.getNextPlayer(this.game);
  }

  submitScore() {
    const inputElement = document.getElementById('score');
    const { value } = inputElement;

    const numberdScore = parseInt(value, 10);

    if (Number.isNaN(numberdScore)) {
      throw new Error('Invalid score: input ist not a number');
    }

    if (numberdScore < 0 || numberdScore > 180) {
      throw new Error(`Invalid score of: ${numberdScore}`);
    }

    this.game = GameService.submitScore(this.game, numberdScore);

    const stringifiedGame = JSON.stringify(this.game);
    const id = GameComponent.getGameId();

    localStorage.setItem(id, stringifiedGame);

    this.updateComponent();
  }
}
