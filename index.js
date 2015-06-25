var request = require('request');
var kgo = require('kgo');
var defaults = require('cog/defaults');

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
  console.log('got apikey: ', apikey)
}

module.exports = function(opts) {
  var configName = (opts || {}).app || 'planetoid';
  var config = require('rc')(configName, {
    baseUrl: 'http://api.planets.nu'
  });

  kgo
  ({ opts: defaults({}, opts, config) })
  ('loginRes', 'login', ['opts'], login)
  ('apikey', ['login'], parseApiKey)
  ('load-turn', ['opts', 'apikey'], loadTurn)
};

