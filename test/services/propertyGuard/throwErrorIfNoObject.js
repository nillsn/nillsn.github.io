import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoObject', () => {
  it('should throw an error if parameter is no object', () => {
    expect(() => PropertyGuardService.throwErrorIfNoObject(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an object', () => {
    const parameter = {};
    expect(() => PropertyGuardService.throwErrorIfNoObject(parameter)).not.to.throw(Error);
  });
});
