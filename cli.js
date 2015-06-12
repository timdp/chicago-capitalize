#!/usr/bin/env node

'use strict'

var minimist = require('minimist')
var capitalize = require('./')

var argv = minimist(process.argv.slice(2))

argv._.forEach(function (arg) {
  console.log(capitalize(arg))
})
