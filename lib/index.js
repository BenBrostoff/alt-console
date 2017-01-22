const util = require('util');
const chalk = require('chalk');
const { getColor, defaultMap } = require('./colors');

class AltLogger {

  constructor(colorMap = defaultMap) {
    this.colorMap = colorMap;
  }

  static freeze(o) {
    return JSON.parse(JSON.stringify(o));
  }

  getColor(v) {
    return getColor(v, this.colorMap);
  }

  liveLog(v, colorOverride) {
    console.log(
      chalk[colorOverride || this.getColor(v)](
        typeof v === 'object'
          ? util.inspect(AltLogger.freeze(v), { depth: null })
          : v
      )
    );
  }

  getCallStack(stackTraceLimit = 10) {
    Object.assign(Error, { stackTraceLimit });
    this.liveLog(new Error().stack, 'green');
  }
}

module.exports = AltLogger;
