'use strict';

const APIClient = require('./APIClient.js');
const Transaction = require('./Transaction.js');

const MAX_BATCH_SIZE = Number.MAX_SAFE_INTEGER; // TODO: replace with actual value

const Transactions = {
  list(client, config, callback) {
      let url = client.baseUrl + '/trans';

      config.client = client;

      APIClient.get(url, config, (err, json) => {
          callback(err, json);
      });
  },
  
  get(node, options, callback) {
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
        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, new Transaction(node, json));
          }
        });
      } else {
        const params = [];
        if (!isNaN(options.page)) {
          const pageVal = parseInt(options.page, 10);
          if (pageVal < 0) {
            throw new Error('Invalid options param \'page\'');
          }
          params.push(`page=${pageVal}`);
        }
        if (!isNaN(options.per_page)) {
          const perPageVal = parseInt(options.per_page, 10);
          if (perPageVal < 1 || perPageVal > MAX_BATCH_SIZE) {
            throw new Error('Invalid options param \'per_page\'');
          }
          params.push(`per_page=${perPageVal}`);
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }
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

    const url = node.json._links.self.href + '/trans';
    APIClient.post(url, config, payload, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, new Transaction(node, json));
      }
    });
  }

};

module.exports = Transactions;
