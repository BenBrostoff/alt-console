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

module.exports = {
  freeze,
  liveLog,
};

