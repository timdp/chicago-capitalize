'use strict';

var XRegExp = require('xregexp').XRegExp;

var minors = {};
require('title-case-minors').forEach(function(m) {
  minors[m.toLowerCase()] = null;
});

var letterRE = XRegExp('^\\p{L}$');
var wordRE = XRegExp('\\b((\\p{L})(\\p{L}*))', 'g');

var replacer = function(str) {
  var fn = function(match, word, first, rest, offset) {
    // If the match is preceded by a letter and an apostrophe, we are dealing
    // with a genitive. Do not capitalize.
    if (offset > 1 &&
        isApostrophe(fn.string[offset - 1]) &&
        isLetter(fn.string[offset - 2])) {
      return word;
    }
    var shouldCapitalize;
    // The first match is always capitalized.
    if (fn.firstOffset < 0) {
      shouldCapitalize = true;
      fn.firstOffset = offset;
    } else {
      // Only capitalize if the word isn't a minor.
      shouldCapitalize = !minors.hasOwnProperty(word.toLowerCase());
    }
    if (shouldCapitalize) {
      // We already capitalize, so we don't need to hold on to the index.
      fn.lastOffset = -1;
      // Perform capitalization.
      return first.toUpperCase() + rest;
    } else {
      // Keep the index of the last word, in case we still need to capitalize.
      fn.lastOffset = offset;
      // Don't touch the word for now.
      return word;
    }
  };
  fn.string = str;
  fn.firstOffset = -1;
  fn.lastOffset = -1;
  return fn;
};

var isApostrophe = function(ch) {
  return ch === '\'' || ch === '’';
};

var isLetter = function(ch) {
  return letterRE.test(ch);
};

module.exports = function(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  var repl = replacer(str);

  // Capitalize all words that aren't minor words.
  var result = str.replace(wordRE, repl);

  // Capitalize the last word if it wasn't already processed.
  if (repl.lastOffset >= 0 && repl.firstOffset !== repl.lastOffset) {
    result = result.substring(0, repl.lastOffset) +
      result[repl.lastOffset].toUpperCase() +
      result.substring(repl.lastOffset + 1);
  }

  return result;
};
