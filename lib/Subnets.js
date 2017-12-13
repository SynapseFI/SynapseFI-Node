'use strict';

const APIClient = require('./APIClient.js');
const Subnet = require('./Subnet.js');

const Subnets = {

  get(node, options, callback) {
    const config = {
      client: node.user.client,
      fingerprint: node.user.fingerprint,
      ip_address: node.user.ip_address,
      oauth_key: node.user.oauth_key
    };
    let url = node.json._links.self.href + '/subnets';
    if (options) {
      if (options._id) {
        url += '/' + options._id;
        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, new Subnet(node, json));
          }
        });
      } else {
        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      }
    } else {
      APIClient.get(url, config, (err, json) => {
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  },

  create(node, payload, callback) {
    const config = {
      client: node.user.client,
      fingerprint: node.user.fingerprint,
      oauth_key: node.user.oauth_key,
      ip_address: node.user.ip_address
    };

    const url = node.json._links.self.href + '/subnets';
    APIClient.post(url, config, payload, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, new Subnet(node, json));
      }
    });
  }

};

module.exports = Subnets;
