chicago-capitalize
==================

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Capitalizes a title according to the Chicago Manual of Style.

Usage
-----

First, install `chicago-capitalize` as a dependency:

```shell
npm install --save chicago-capitalize
```

Then, use it in your scripts, like so:

```js
var capitalize = require('chicago-capitalize');

var input = 'The quick brown fox jumps over the lazy dog.';
var output = capitalize(input);

// Prints 'The Quick Brown Fox Jumps Over the Lazy Dog.'
console.log(output);
```

Author
------

[Tim De Pauw](http://tmdpw.eu/)

License
-------

Copyright &copy; 2014 Tim De Pauw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[npm-url]: https://npmjs.org/package/chicago-capitalize
[npm-image]: https://badge.fury.io/js/chicago-capitalize.png

[travis-url]: http://travis-ci.org/timdp/node-chicago-capitalize
[travis-image]: https://secure.travis-ci.org/timdp/node-chicago-capitalize.png?branch=master
