import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoArrayOfBooleans', () => {
  it('should throw an error if parameter is no array of booleans', () => {
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfBooleans(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an array of booleans', () => {
    const parameter = [false];
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfBooleans(parameter)).not.to.throw(Error);
  });
});
