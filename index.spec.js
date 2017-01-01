const { expect } = require('chai');
const { freeze } = require('./');

describe('#freeze()', () => {
  it('should freeze the object at its current state', () => {
    const test = { a: 1 };
    const frozen = freeze(test);
    expect(frozen).to.eql({ a: 1 });

    test.a = 2;
    expect(frozen).to.eql({ a: 1 });
  });
});
