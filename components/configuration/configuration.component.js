import GameService from '../../services/game.service.js';

export default class ConfigurationComponent {
  static template = './components/configuration/configuration.component.html';

  static async createTwoPlayerGame() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    const players = [player1, player2];
    const game = GameService.create(players);

    const key = await ConfigurationComponent.generateRandomKey();
    const stringifiedGame = JSON.stringify(game);

    localStorage.setItem(key, stringifiedGame);
    window.location = `?route=game&id=${key}`;
  }

  static async generateRandomKey() {
    const msgUint8 = new TextEncoder().encode(Math.random());
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return hashHex.substr(0, 16);
  }
}
