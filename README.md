# chicago-capitalize

[![npm](https://img.shields.io/npm/v/chicago-capitalize.svg)](https://www.npmjs.com/package/chicago-capitalize) [![Build Status](https://img.shields.io/travis/timdp/chicago-capitalize.svg)](https://travis-ci.org/timdp/chicago-capitalize) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Capitalizes a title according to the Chicago Manual of Style.

## Usage

First, install `chicago-capitalize` as a dependency:

```shell
npm install --save chicago-capitalize
```

Then, use it in your scripts, like so:

```js
var capitalize = require('chicago-capitalize')

var input = 'The quick brown fox jumps over the lazy dog.'
var output = capitalize(input)

// Prints 'The Quick Brown Fox Jumps Over the Lazy Dog.'
console.log(output)
```

You can also pass an options object. For now, the only option is `whitelist`:
an array of words not to capitalize. Note that it is case-sensitive.

```js
var input = 'Sent from my iPhone.'
var options = { whitelist: ['iPhone'] }
var output = capitalize(input, options)

// Prints 'Sent from My iPhone.'
console.log(output)
```

## Author

[Tim De Pauw](https://tmdpw.eu/)

## License

MIT
