'use strict';

const APIClient = require('./APIClient.js');

const Node = (user, json) => {
  this.user = user;
  this.json = json;
};

Node.prototype.updateJSON = (err, json, callback) => {
  if (err) {
    callback(err);
  } else {
    this.json = json;
    callback(null, this);
  }
};

Node.prototype.update = (payload, callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, json) {
    self.updateJSON(err, json, callback);
  });
};

Node.prototype.delete = (callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.delete(url, config, (err, json) {
    self.updateJSON(err, json, callback);
  });
};

Node.prototype.getAPIConfig = () => {
  return {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };
};

module.exports = Node;
