'use strict';

const APIClient = require('./APIClient.js');

const User = (client, json, ip_address, fingerprint, callback) => {
  this.client = client;
  this.json = json;
  this.ip_address = ip_address;
  this.fingerprint = fingerprint;
  this.grabOauthKey(callback);
};

User.prototype.grabOauthKey = (callback) => {
  const self = this;
  const payload = {
    refresh_token: this.json.refresh_token
  };
  const config = {
    client: this.client,
    fingerprint: this.fingerprint,
    ip_address: this.ip_address
  };
  const url = this.client.baseUrl + '/oauth/'+ this.json['_id'];
  APIClient.post(url, config, payload, (err, json) => {
    if (err) {
      callback(err);
    } else {
      self.oauth_key = json['oauth_key'];
      callback(null, self);
    }
  });
};

User.prototype.updateJSON = (err, json, callback) => {
  if (err) {
    callback(err);
  } else {
    this.json = json;
    callback(err, this);
  }
};

User.prototype.update = (payload, callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, json) => {
    self.updateJSON(err, json, callback);
  });
};

// duplicate of update
User.prototype.addDocuments = (payload, callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, json) => {
    self.updateJSON(err, json, callback);
  });
};

// duplicate of update
User.prototype.addDoc = (payload, callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, json) => {
    self.updateJSON(err, json, callback);
  });
};

// duplicate of update
User.prototype.answerKBA = (payload, callback) => {
  const url = this.json._links.self.href;
  const self = this;
  const config = this.getAPIConfig();
  APIClient.patch(url, config, payload, (err, res) => {
    self.updateJSON(err, res, callback);
  });
};

User.prototype.getAPIConfig = () => {
  return {
    client: this.client,
    ip_address: this.ip_address,
    fingerprint: this.fingerprint,
    oauth_key: this.oauth_key
  };
};

module.exports = User;
