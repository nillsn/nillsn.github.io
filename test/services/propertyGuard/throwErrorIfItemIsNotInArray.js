import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfItemIsNotInArray', () => {
  it('should throw an error if parameter item is not part of the array', () => {
    const item = 'item 1';
    const itemArray = ['item 2'];

    expect(() => PropertyGuardService.throwErrorIfItemIsNotInArray(item, itemArray)).to.throw(Error);
  });

  it('should not throw an error if parameter item is part of the array', () => {
    const item = 'item 1';
    const itemArray = ['item 1'];

    expect(() => PropertyGuardService.throwErrorIfItemIsNotInArray(item, itemArray)).not.to.throw(Error);
  });
});
