#!/usr/bin/env node
var nopt = require('nopt');
var knownOpts = {
  gameid: Number
};
var shorthands = {};
var opts = nopt(knownOpts, shorthands, process.argv, 2);

require('..')(opts, function(err) {
  if (err) {
    console.error(err);
  }
});