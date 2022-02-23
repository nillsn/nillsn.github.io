export default class PropertyGuardService {
  static throwErrorIfUndefined(parameter) {
    if (parameter === undefined) {
      throw new Error('PropertyGuardError: parameter is undefined');
    }
  }

  static throwErrorIfNoString(parameter) {
    if (typeof parameter !== 'string') {
      throw new Error('PropertyGuardError: parameter is not a string');
    }
  }

  static throwErrorIfNoArrayOfStrings(parameter) {
    parameter.forEach((element) => {
      try {
        this.throwErrorIfNoString(element);
      } catch {
        throw new Error('PropertyGuardError: parameter is not an array of strings');
      }
    });
  }

  static throwErrorIfNoNumber(parameter) {
    if (typeof parameter !== 'number') {
      throw new Error('PropertyGuardError: parameter is not a number');
    }
  }

  static throwErrorIfNoArrayOfNumbers(parameter) {
    parameter.forEach((element) => {
      try {
        this.throwErrorIfNoNumber(element);
      } catch {
        throw new Error('PropertyGuardError: parameter is not an array of numbers');
      }
    });
  }

  static throwErrorIfNoBoolean(parameter) {
    if (typeof parameter !== 'boolean') {
      throw new Error('PropertyGuardError: parameter is not a boolean');
    }
  }

  static throwErrorIfNoArrayOfBooleans(parameter) {
    parameter.forEach((element) => {
      try {
        this.throwErrorIfNoBoolean(element);
      } catch {
        throw new Error('PropertyGuardError: parameter is not an array of booleans');
      }
    });
  }

  static throwErrorIfNoArray(parameter) {
    if (Array.isArray(parameter) === false) {
      throw new Error('PropertyGuardError: parameter is not an array');
    }
  }

  static throwErrorIfNoObject(parameter) {
    if (typeof parameter !== 'object') {
      throw new Error('PropertyGuardError: parameter is not an object');
    }
  }

  static throwErrorIfNoArrayOfObjects(parameter) {
    parameter.forEach((element) => {
      try {
        this.throwErrorIfNoObject(element);
      } catch {
        throw new Error('PropertyGuardError: parameter is not an array of objects');
      }
    });
  }

  static throwErrorIfItemIsNotInArray(item, array) {
    this.throwErrorIfUndefined(item);
    this.throwErrorIfNoArray(array);

    if (array.includes(item) === false) {
      throw new Error('PropertyGuardError: item is not part of the array');
    }
  }
}
