const util = require('util');
const chalk = require('chalk');
const { getColor, defaultMap } = require('./colors');

class AltLogger {
  static freeze(o) {
    return JSON.parse(JSON.stringify(o));
  }

  constructor(colorMap = defaultMap) {
    this.colorMap = Object.assign({}, defaultMap, colorMap);
  }

  getLog(v, override) {
    return chalk[override || this.getColor(v)](typeof v === 'object'
      ? util.inspect(AltLogger.freeze(v), { depth: null })
      : v);
  }

  getColor(v) {
    return getColor(v, this.colorMap);
  }

  liveLog(...values) {
    const styledValues = values.map(v => this.getLog(v));
    console.log(...styledValues);
  }

  singleLog(value, override) {
    console.log(this.getLog(value, override));
  }

  getCallStack(stackTraceLimit = 10) {
    Object.assign(Error, { stackTraceLimit });
    this.liveLog(new Error().stack);
  }
}

module.exports = AltLogger;
