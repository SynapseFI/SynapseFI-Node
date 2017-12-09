'use strict';

const APIClient = require('./APIClient.js');

const Subscription = function(client, json) {
  this.client = client;
  this.json = json;
};

Subscription.prototype.updateJSON = function(err, json, callback) {
  if (err) {
    callback(err);
  } else {
    this.json = json;
    if (callback) {
      callback(null, this);
    }
  }
};

Subscription.prototype.update = function(payload, callback) {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, json) => {
    self.updateJSON(err, json, callback);
  });
};

Subscription.prototype.getAPIConfig = function() {
  return {
    client: this.client
  };
};

module.exports = Subscription;

