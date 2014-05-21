'use strict';

var minors = require('title-case-minors');
var quotemeta = require('quotemeta');

var wordRE = /\b((\w)(\w*))/g;
var minRE = new RegExp('^(?:' + minors.map(quotemeta).join('|') + ')$', 'i');

var replacer = function() {
  var fn = function(match, word, first, rest, offset) {
    if (fn.firstOffset < 0) {
      fn.firstOffset = offset;
    }
    fn.lastOffset = offset;
    return minRE.test(word) ? word : first.toUpperCase() + rest;
  };
  fn.firstOffset = -1;
  fn.lastOffset = -1;
  return fn;
};

module.exports = function(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  var repl = replacer();

  // Capitalize all words that aren't in minors
  var result = str.replace(wordRE, repl);

  // Capitalize the first and last word
  if (repl.firstOffset === repl.lastOffset) {
    // Only one word
    result = result.substring(0, repl.firstOffset) +
      result[repl.firstOffset].toUpperCase() +
      result.substring(repl.firstOffset + 1);
  } else {
    // Capitalize both
    result = result.substring(0, repl.firstOffset) +
      result[repl.firstOffset].toUpperCase() +
      result.substring(repl.firstOffset + 1, repl.lastOffset) +
      result[repl.lastOffset].toUpperCase() +
      result.substring(repl.lastOffset + 1);
  }

  return result;
};
