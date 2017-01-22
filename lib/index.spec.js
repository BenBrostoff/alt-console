const sinon = require('sinon');
const { expect } = require('chai');
const AltLogger = require('./');
const { defaultMap } = require('./colors');

const logger = new AltLogger();

let sandbox;
beforeEach(() => (sandbox = sinon.sandbox.create()));
afterEach(() => sandbox.restore());


describe('#getColorMap', () => {
  const expectations = {
    objects: [{}, defaultMap.OBJECT],
    arrays: [[], defaultMap.ARRAY],
    booleans: [true, defaultMap.BOOLEAN],
    strings: ['hello', defaultMap.STRING],
    numbers: [1, defaultMap.NUMBER],
  };

  new Map(Object.entries(expectations)).forEach((v, k) => {
    it(`should log with a unique color for ${k}`, () => {
      const [val, color] = v;
      expect(logger.getColor(val)).to.equal(color);
    });
  });
});

describe('#getCallStack', () => {
  it('should not impact the return value if called inside a function', () => {
    const testFn = () => {
      sandbox.stub(console, 'log');
      logger.getCallStack();
      sandbox.restore();
      return 1;
    };

    expect(testFn()).to.equal(1);
  });

  it('should enforce a limit on the callstack', () => {
    const logSpy = sandbox.spy(console, 'log');
    logger.getCallStack(0);
    expect(logSpy.stacks).to.eql(['Error']);
  });
});

describe('#freeze()', () => {
  it('should freeze the object at its current state', () => {
    const test = { a: 1 };
    const frozen = AltLogger.freeze(test);
    expect(frozen).to.eql({ a: 1 });

    test.a = 2;
    expect(frozen).to.eql({ a: 1 });
  });
});
