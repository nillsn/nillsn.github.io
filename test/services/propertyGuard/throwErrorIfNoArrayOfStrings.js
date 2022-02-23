import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoArrayOfStrings', () => {
  it('should throw an error if parameter is no array of strings', () => {
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfStrings(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an array of strings', () => {
    const parameter = ['definedParameter'];
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfStrings(parameter)).not.to.throw(Error);
  });
});
