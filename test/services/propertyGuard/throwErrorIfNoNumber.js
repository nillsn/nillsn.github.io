import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoNumber', () => {
  it('should throw an error if parameter is no number', () => {
    expect(() => PropertyGuardService.throwErrorIfNoNumber(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is a number', () => {
    const parameter = 100;
    expect(() => PropertyGuardService.throwErrorIfNoNumber(parameter)).not.to.throw(Error);
  });
});
