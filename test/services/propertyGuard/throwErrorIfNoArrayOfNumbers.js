import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoArrayOfNumbers', () => {
  it('should throw an error if parameter is no array of numbers', () => {
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfNumbers(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an array of numbers', () => {
    const parameter = [100];
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfNumbers(parameter)).not.to.throw(Error);
  });
});
