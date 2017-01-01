const freeze = o => JSON.parse(JSON.stringify(o));

const liveLog = v => (
  console.log(
    typeof v === 'object'
      ? freeze(v)
      : v
  )
);

module.exports = {
  freeze,
  liveLog,
};

