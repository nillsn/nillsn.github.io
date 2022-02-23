import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfUndefined', () => {
  it('should throw an error if parameter is undefined', () => {
    expect(() => PropertyGuardService.throwErrorIfUndefined(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is defined', () => {
    const parameter = 'definedParameter';
    expect(() => PropertyGuardService.throwErrorIfUndefined(parameter)).not.to.throw(Error);
  });
});
