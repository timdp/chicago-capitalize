'use strict';

var XRegExp = require('xregexp').XRegExp;

var minors = {};
require('title-case-minors').forEach(function(m) {
  minors[m.toLowerCase()] = null;
});

var letterRE = XRegExp('^\\p{L}$');
var wordRE = XRegExp('\\b((\\p{L})(\\p{L}*))', 'g');

var replacer = function(str, whitelist) {
  var fn = function(match, word, first, rest, offset) {
    var shouldCapitalize;
    if (offset > 1 &&
        isApostrophe(fn.string[offset - 1]) &&
        isLetter(fn.string[offset - 2])) {
      // If the match is preceded by a letter and an apostrophe, we are dealing
      // with a genitive. Do not capitalize.
      shouldCapitalize = false;
    } else if (fn.firstOffset < 0) {
      // The first match is always capitalized, except if it is whitelisted.
      shouldCapitalize = true;
      // Hold on to the match's position.
      fn.firstOffset = offset;
    } else {
      // Only capitalize if the word isn't a minor.
      shouldCapitalize = !minors.hasOwnProperty(word.toLowerCase());
    }

    if (!shouldCapitalize) {
      // Keep the position of the last word we encountered, because we need to
      // capitalize it when we are done.
      fn.lastOffset = offset;
      // Don't touch the word for now.
      return word;
    }

    // Even if this is the last word, we are already about to capitalize it, so
    // we don't need to hold on to its position.
    fn.lastOffset = -1;

    // Perform capitalization unless the word is whitelisted.
    return whitelist.hasOwnProperty(word) ?
      word :
      first.toUpperCase() + rest;
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

module.exports = function(str, options) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  var whitelist = {};
  if (typeof options === 'object' && options !== null && options.whitelist) {
    options.whitelist.forEach(function(word) {
      whitelist[word] = null;
    });
  }

  var repl = replacer(str, whitelist);

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
