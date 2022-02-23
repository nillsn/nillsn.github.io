export default class PlayerNameRotationService {
  static rotate(playerNames, numberOfSets, numberOfLegs) {
    const copy = JSON.parse(JSON.stringify(playerNames));
    const m = numberOfSets + numberOfLegs;

    for (let i = 0; i < m; i += 1) {
      copy.push(copy.shift());
    }

    return copy;
  }
}
