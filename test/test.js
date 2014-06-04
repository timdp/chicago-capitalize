var capitalize = require('../');
var assert = require('assert');

var describe = global.describe;
var it = global.it;

var def = function(desc, input, expected) {
  it(desc, function(done) {
    assert.strictEqual(capitalize(input), expected);
    done();
  });
};

describe('chicago-capitalize', function() {
  def('does not choke on empty strings',
    '',
    '');

  def('respects whitespace',
    '    a \t b    \n  c  ',
    '    A \t B    \n  C  ');

  def('capitalizes a single word',
    'foo',
    'Foo');

  def('capitalizes a single word surrounded by whitespace',
    '    a  ',
    '    A  ');

  def('capitalizes an entire sentence',
    'foo bar baz',
    'Foo Bar Baz');

  def('keeps punctuation intact',
    'foo (bar).',
    'Foo (Bar).');

  def('ignores articles, prepositions, and conjunctions',
    'put to the test or so',
    'Put to the Test or So');

  def('always capitalizes the last word',
    'log in',
    'Log In');

  def('does not affect capitalized words',
    'Read our FAQ now',
    'Read Our FAQ Now');

  def('does not mangle existing capitalization',
    'This Sentence Is Already Fully Capitalized and Pretty. Hurray!',
    'This Sentence Is Already Fully Capitalized and Pretty. Hurray!');

  def('handles international characters properly',
    'crème brûlée',
    'Crème Brûlée');

  def('does not capitalize after an apostrophe',
    "it's the 'bee's knees', man",
    "It's the 'Bee's Knees', Man");
});
