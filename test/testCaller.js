import { describe } from 'mocha';

export default class TestCaller {
  static call(classUnderTest, methodUnderTest, tests) {
    describe(`Class: ${classUnderTest} - Method: ${methodUnderTest}`, () => {
      tests();
    });
  }
}
