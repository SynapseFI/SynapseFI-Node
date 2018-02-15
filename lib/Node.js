'use strict';

const APIClient = require('./APIClient.js');

const Node = function(user, json) {
  this.user = user;
  this.json = json;
};

Node.prototype.updateJSON = function(err, json, callback) {
  if (err) {
    callback(err);
  } else {
    this.json = json;
    if (callback) {
      callback(null, this);
    }
  }
};

Node.prototype.update = function(payload, callback) {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, function(err, json) {
    self.json = json;
    callback(err, json);
  });
};

Node.prototype.resendMicro = function(callback) {
  const url = this.json._links.self.href + "?resend_micro=YES";
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, {}, function(err, json) {
    self.json = json;
    callback(err, json);
  });
};

Node.prototype.delete = function(callback) {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.delete(url, config, function(err, json) {
    self.updateJSON(err, json, callback);
  });
};

Node.prototype.getAPIConfig = function() {
  return {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };
};

module.exports = Node;
