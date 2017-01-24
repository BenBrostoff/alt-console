const defaultMap = {
  OBJECT: 'green',
  ARRAY: 'yellow',
  STRING: 'red',
  BOOLEAN: 'blue',
  NUMBER: 'cyan',
};

const getColor = (v, colorMap) => {
  if (Array.isArray(v)) {
    return colorMap.ARRAY;
  } else if (typeof v === 'object') {
    return colorMap.OBJECT;
  } else if (typeof v === 'string') {
    return colorMap.STRING;
  } else if (typeof v === 'boolean') {
    return colorMap.BOOLEAN;
  } else if (typeof v === 'number') {
    return colorMap.NUMBER;
  }

  return 'black';
};

module.exports = {
  defaultMap,
  getColor,
};
