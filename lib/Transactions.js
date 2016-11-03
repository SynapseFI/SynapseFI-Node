'use strict';

const APIClient = require('./APIClient.js');
const Transaction = require('./Transaction.js');

const Transactions = {

  get: function(node, options, callback) {
    const config = {
      client: node.user.client,
      fingerprint: node.user.fingerprint,
      ip_address: node.user.ip_address,
      oauth_key: node.user.oauth_key
    };
    let url = node.json._links.self.href + '/trans';
    if (options) {
      if (options._id) {
        url += '/' + options._id;
        APIClient.get(url, config, function(err, json) {
          if (err) {
            callback(err);
          } else {
            callback(null, new Transaction(node, json));
          }
        });
      } else {
        APIClient.get(url, config, function(err, json) {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      }
    } else {
      APIClient.get(url, config, function(err, json) {
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  },

  create: function(node, payload, callback) {
    const config = {
      client: node.user.client,
      fingerprint: node.user.fingerprint,
      oauth_key: node.user.oauth_key,
      ip_address: node.user.ip_address
    };
    const url = node.json._links.self.href + '/trans';
    APIClient.post(url, config, payload, function(err, json) {
      if (err) {
        callback(err);
      } else {
        callback(null, new Transaction(node, json));
      }
    });
  }
};

module.exports = Transactions;
