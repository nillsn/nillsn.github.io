import { assert } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PlayerNameRotationService from '../../../services/playerNameRotation.service.js';

TestCaller.call('PlayerNameRotationService', 'rotate', () => {
  it('should return the same order if both parameters are 0', () => {
    const playerNames = ['Kaddi', 'Pelle'];
    const rotatedPlayerNames = PlayerNameRotationService.rotate(playerNames, 0, 0);

    assert.deepEqual(rotatedPlayerNames, playerNames);
  });

  it('should rotate the order by 1 if set parameter is 0 and leg parameter is 1', () => {
    const playerNames = ['Kaddi', 'Pelle'];
    const expectedPlayerNames = ['Pelle', 'Kaddi'];

    const rotatedPlayerNames = PlayerNameRotationService.rotate(playerNames, 0, 1);

    assert.deepEqual(rotatedPlayerNames, expectedPlayerNames);
  });

  it('should rotate the order by 1 if set parameter is 1 and leg parameter is 0', () => {
    const playerNames = ['Kaddi', 'Pelle'];
    const expectedPlayerNames = ['Pelle', 'Kaddi'];

    const rotatedPlayerNames = PlayerNameRotationService.rotate(playerNames, 1, 0);

    assert.deepEqual(rotatedPlayerNames, expectedPlayerNames);
  });

  it('should rotate the order by 2 if set parameter is 1 and leg parameter is 1', () => {
    const playerNames = ['Kaddi', 'Pelle'];
    const expectedPlayerNames = ['Kaddi', 'Pelle'];

    const rotatedPlayerNames = PlayerNameRotationService.rotate(playerNames, 1, 1);

    assert.deepEqual(rotatedPlayerNames, expectedPlayerNames);
  });

  it('should rotate the order by 2 if set parameter is 0 and leg parameter is 2', () => {
    const playerNames = ['Kaddi', 'Pelle', 'Siggi'];
    const expectedPlayerNames = ['Siggi', 'Kaddi', 'Pelle'];

    const rotatedPlayerNames = PlayerNameRotationService.rotate(playerNames, 0, 2);

    assert.deepEqual(rotatedPlayerNames, expectedPlayerNames);
  });
});
