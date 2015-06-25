var request = require('request');
var kgo = require('kgo');
var defaults = require('cog/defaults');

function checkOpts(opts, callback) {
  if (! opts.gameid) {
    return callback(new Error('no gameid specified'));
  }

  callback();
}

function login(opts, callback) {
  var formData = {
    username: opts.username,
    password: opts.password
  };

  request.post(opts.baseUrl + '/login', { form: formData }, callback);
}

function parseApiKey(body, callback) {
  try {
    body = JSON.parse(body);
  }
  catch (e) {
    return callback(e);
  }

  if (! body.success) {
    return callback(new Error('could not login'));
  }

  callback(null, body.apikey);
}

function loadTurn(opts, apikey, callback) {
  var qs = {
    gameid: opts.gameid,
    apikey: apikey
  };

  request.get(opts.baseUrl + '/game/loadturn', { qs: qs }, callback);
}

function processTurn(turndata, callback) {
  console.login('got turn data: ', turndata);
}

module.exports = function(opts, callback) {
  var configName = (opts || {}).app || 'planetoid';
  var config = require('rc')(configName, {
    baseUrl: 'http://api.planets.nu'
  });

  kgo
  ({ opts: defaults({}, opts, config) })
  ('checkOpts', ['opts'], checkOpts)
  ('loginRes', 'login', ['!checkOpts', 'opts'], login)
  ('apikey', ['login'], parseApiKey)
  ('turndataRes', 'turndata', ['opts', 'apikey'], loadTurn)
  ('processTurn', ['turndata'], processTurn)
  .on('error', callback)
};

