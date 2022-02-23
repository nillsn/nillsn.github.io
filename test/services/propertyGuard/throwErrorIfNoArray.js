import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoArray', () => {
  it('should throw an error if parameter is no array', () => {
    expect(() => PropertyGuardService.throwErrorIfNoArray(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an array', () => {
    const parameter = [];
    expect(() => PropertyGuardService.throwErrorIfNoArray(parameter)).not.to.throw(Error);
  });
});
