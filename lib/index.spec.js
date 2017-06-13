const sinon = require('sinon');
const { expect } = require('chai');
const AltLogger = require('./');
const { defaultMap } = require('./colors');

const logger = new AltLogger();

const sandbox = sinon.sandbox.create();
afterEach(() => sandbox.restore());


describe('#getColor', () => {
  const expectations = {
    objects: [{}, defaultMap.OBJECT],
    arrays: [[], defaultMap.ARRAY],
    booleans: [true, defaultMap.BOOLEAN],
    strings: ['hello', defaultMap.STRING],
    numbers: [1, defaultMap.NUMBER],
  };

  Object.keys(expectations).forEach((k) => {
    it(`should log with a unique color for ${k}`, () => {
      const v = expectations[k];
      const [val, color] = v;
      expect(logger.getColor(val)).to.equal(color);
      expect(() => logger.liveLog(val)).not.to.throw(Error);
    });
  });

  it('should allow selective ovverrides', () => {
    const anotherLogger = new AltLogger({ STRING: 'green' });
    expect(anotherLogger.getColor('')).to.equal('green');
    expect(anotherLogger.getColor({})).to.equal('green');
  });
});

describe('#getCallStack', () => {
  it('should not impact the return value if called inside a function', () => {
    const testFn = () => {
      sandbox.stub(console, 'log');
      logger.getCallStack();
      return 1;
    };

    try {
      expect(testFn()).to.equal(1);
    } finally {
      console.log.restore();
    }
  });

  it('should enforce a limit on the callstack', () => {
    try {
      const logSpy = sandbox.stub(console, 'log');
      logger.getCallStack(0);
      expect(logSpy.calledWithMatch(/Error/)).to.equal(true);
    } finally {
      console.log.restore();
    }
  });
});

describe('#freeze', () => {
  it('should freeze the object at its current state', () => {
    const test = { a: 1 };
    const frozen = AltLogger.freeze(test);
    expect(frozen).to.eql({ a: 1 });

    test.a = 2;
    expect(frozen).to.eql({ a: 1 });
  });
});
