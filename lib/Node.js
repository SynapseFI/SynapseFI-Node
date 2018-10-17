'use strict';

const APIClient = require('./APIClient.js');

const Node = function(user, json) {
  this.user = user;
  this.json = json;
};

Node.prototype.shipDebitCard = function(options, callback) {
  const config = {
    client: this.user.client,
    ip_address: this.user.ip_address,
    fingerprint: this.user.fingerprint,
    oauth_key: this.user.oauth_key
  };

  let url = `${this.json._links.self.href}`;

  const payload = {};

  if (options) {
    if (options.ship) {
      url += `?ship=${options.ship}`;
    }

    if (options.fee_node_id) {
      payload.fee_node_id = options.fee_node_id;
    }
    if (options.expedite) {
      payload.expedite = options.expedite;
    }
    if (options.card_style_id) {
      payload.card_style_id = options.card_style_id;
    }
  }

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
