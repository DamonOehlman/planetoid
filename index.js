var request = require('request');
var kgo = require('kgo');
var defaults = require('cog/defaults');

/**
  # planetoid

  This is an in-progress helper for working with the [planets.nu](http://planets.nu)
  API.

  ## Usage

  First install:

  ```
  npm install -g planetoid
  ```

  Then you will be able to retrieve turn data for a game you are currently playing
  using the following command:

  ```
  planetoid --username=foo --password=bar --gameid=1234
  ```

  Additionally, you can create an [rc](https://github.com/dominictarr/rc) compatible
  configuration file and provide `username` and `password` information there instead.
  For example I have on my machine a `~/.config/planetoid` file containing something
  similar to the following:

  ```
  username=foo
  password=bar
  ```
**/

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

  request.post(opts.baseUrl + '/login', { form: formData, json: true }, callback);
}

function parseApiKey(body, callback) {
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

  request.get(opts.baseUrl + '/game/loadturn', { qs: qs, gzip: true }, callback);
}

function processTurn(turndata, callback) {
  console.log(turndata);
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

