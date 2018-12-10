'use strict';

const APIClient = require('./APIClient.js');

const Subnet = function(node, json) {
  this.node = node;
  this.json = json;
};

Subnet.prototype.shipCard = function(options, callback) {
  const config = this.generateConfig();
  const url = `${this.json._links.self.href}/ship`;

  const payload = {};

  if (options) {
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
}

Subnet.prototype.updateJSON = function(err, json, callback) {
  if (err) {
    callback(err);
  } else {
    this.json = json;
    if (callback) {
      callback(null, this);
    }
  }
};

Subnet.prototype.generateConfig = function() {
  return {
    oauth_key: this.node.user.oauth_key,
    fingerprint: this.node.user.fingerprint,
    client: this.node.user.client,
    ip_address: this.node.user.ip_address
  };
};

Subnet.prototype.update = function(payload, callback) {
  const url = this.json._links.self.href;
  const config = this.generateConfig();
  const self = this;
  APIClient.patch(url, config, payload, function(err, json) {
    self.updateJSON(err, json, callback);
  });
};


module.exports = Subnet;
