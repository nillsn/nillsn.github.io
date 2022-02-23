import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoBoolean', () => {
  it('should throw an error if parameter is no boolean', () => {
    expect(() => PropertyGuardService.throwErrorIfNoBoolean(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is a boolean', () => {
    const parameter = false;
    expect(() => PropertyGuardService.throwErrorIfNoBoolean(parameter)).not.to.throw(Error);
  });
});
