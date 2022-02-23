import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoString', () => {
  it('should throw an error if parameter is no string', () => {
    expect(() => PropertyGuardService.throwErrorIfNoString(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is a string', () => {
    const parameter = 'definedParameter';
    expect(() => PropertyGuardService.throwErrorIfNoString(parameter)).not.to.throw(Error);
  });
});
