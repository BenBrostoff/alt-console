const chalk = require('chalk');

const freeze = o => JSON.parse(JSON.stringify(o));

const liveLog = (v, color = 'red') => (
  console.log(
    chalk[color](
      typeof v === 'object'
        ? freeze(v)
        : v
    )
  )
);

const getCallStack = (limit = 10) => {
  Object.assign(Error, { stackTraceLimit: limit });
  liveLog(new Error().stack, 'green');
};

module.exports = {
  freeze,
  liveLog,
  getCallStack,
};

