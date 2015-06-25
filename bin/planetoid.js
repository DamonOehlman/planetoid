#!/usr/bin/env node
var nopt = require('nopt');
var knownOpts = {};
var shorthands = {};
var opts = nopt(knownOpts, shorthands, process.argv, 2);

require('..')(opts);