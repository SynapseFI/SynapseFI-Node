'use strict';

const APIClient = require('./APIClient.js');

const Node = function(user, json) {
  this.user = user;
  this.json = json;
};

Node.prototype.shipDebitCard = function(payload, callback) {
  const url = `${this.json._links.self.href}?ship=yes`;

  const config = {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };


  APIClient.patch(url, config, payload, (err, json) => {
    if (err) {
      callback(err);
    } else {
      callback(null, json);
    }
  });
};

Node.prototype.resetDebitCard = function(options, callback) {
  const config = {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };

  let url = `${this.json._links.self.href}`;

  if (options) {
    if (options.reset) {
      url += `?reset=${options.reset}`;
    }
  }

  APIClient.patch(url, config, {}, (err, json) => {
    if (err) {
      callback(err);
    } else {
      callback(null, json);
    }
  });
};

Node.prototype.triggerDummyTransaction = function(options, callback) {
  const config = {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };

  let url = `${this.json._links.self.href}/dummy-tran`;
  let useSubsequentDelimiter = false;

  if (options) {
    if (options.is_credit) {
      url += `?is_credit=${options.is_credit}`;
      useSubsequentDelimiter = true;
    }
    if (options.type) {
      let delimiter = useSubsequentDelimiter ? '&' : '?';
      url += `${delimiter}type=${options.type}`;
      useSubsequentDelimiter = true;
    }
    if (options.foreign_transaction) {
      let delimiter = useSubsequentDelimiter ? '&' : '?';
      url += `${delimiter}foreign_transaction=${options.foreign_transaction}`;
      useSubsequentDelimiter = true;
    }
    if (options.subnetid) {
      let delimiter = useSubsequentDelimiter ? '&' : '?';
      url += `${delimiter}subnetid=${options.subnetid}`;
      useSubsequentDelimiter = true;
    }
  }

  APIClient.get(url, config, (err, json) => {
    if (err) {
      callback(err);
    } else {
      callback(null, json);
    }
  });
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
