const sinon = require('sinon');
const { expect } = require('chai');
const { getCallStack, freeze } = require('./');

let sandbox;
beforeEach(() => (sandbox = sinon.sandbox.create()));
afterEach(() => sandbox.restore());

describe('#getCallStack', () => {
  it('should not impact the return value if called inside a function', () => {
    const testFn = () => {
      sandbox.stub(console, 'log');
      getCallStack();
      sandbox.restore();
      return 1;
    };

    expect(testFn()).to.equal(1);
  });

  it('should enforce a limit on the callstack', () => {
    const logSpy = sandbox.spy(console, 'log');
    getCallStack(0);
    expect(logSpy.stacks).to.eql(['Error']);
  });
});

describe('#freeze()', () => {
  it('should freeze the object at its current state', () => {
    const test = { a: 1 };
    const frozen = freeze(test);
    expect(frozen).to.eql({ a: 1 });

    test.a = 2;
    expect(frozen).to.eql({ a: 1 });
  });
});
