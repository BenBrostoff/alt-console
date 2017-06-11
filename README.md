[![Build Status](https://travis-ci.org/BenBrostoff/alt-console.svg?branch=master)](https://travis-ci.org/BenBrostoff/alt-console)
[![Greenkeeper badge](https://badges.greenkeeper.io/BenBrostoff/alt-console.svg)](https://greenkeeper.io/)

Super small npm module in response to known issues with Chrome not logging objects at current state.

- [S/O inspiration](http://stackoverflow.com/questions/24175017/google-chrome-console-log-inconsistency-with-objects-and-arrays)
- [Webkit bug that makes mention of this issue](https://bugs.webkit.org/show_bug.cgi?id=35801)

# Usage

```javascript
const obj = { a: 1 };

const logger = new AltLogger();
logger.getCallStack();
logger.liveLog(t); // { a: 1 }

const obj = { a: 2 };
```
