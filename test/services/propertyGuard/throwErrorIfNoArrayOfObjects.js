import { expect } from 'chai';
import { it } from 'mocha';

import TestCaller from '../../testCaller.js';
import PropertyGuardService from '../../../services/propertyGuard.service.js';

TestCaller.call('PropertyGuardService', 'throwErrorIfNoArrayOfObjects', () => {
  it('should throw an error if parameter is no array of objects', () => {
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfObjects(undefined)).to.throw(Error);
  });

  it('should not throw an error if parameter is an array of objects', () => {
    const parameter = [{}];
    expect(() => PropertyGuardService.throwErrorIfNoArrayOfObjects(parameter)).not.to.throw(Error);
  });
});
