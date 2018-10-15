'use strict';

const APIClient = require('./APIClient.js');
const Transaction = require('./Transaction.js');

const Transactions = {
  //GET All Client Transactions
  getClient(client, options, callback) {
    const config = {
      client: client
    };

    let url = client.baseUrl + '/trans';

    if (options) {
      const queryParams = [];

      if (options.page) {
        queryParams.push(`page=${options.page}`);
      }
      if (options.per_page) {
        queryParams.push(`per_page=${options.per_page}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
    }

    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, json);
      }
    });
  },

  // GET All User Transactions
  getUser(user, options, callback) {
    const config = {
      client: user.client,
      ip_address: user.ip_address,
      fingerprint: user.fingerprint,
      oauth_key: user.oauth_key
    };

    let url = `${user.json._links.self.href}/trans`;

    if (options) {
      const queryParams = [];

      if (options.page) {
        queryParams.push(`page=${options.page}`);
      }
      if (options.per_page) {
        queryParams.push(`per_page=${options.per_page}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
    }

    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, json);
      }
    });
  },

  // GET All Node Transactions / GET Transaction (if transactionID provided)
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

        if (options.page) {
          params.push(`page=${options.page}`);
        }
        if (options.per_page) {
          params.push(`per_page=${options.per_page}`);
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

    if (payload.idempotency_key) {
      config.idempotency_key = payload.idempotency_key;
      delete payload.idempotency_key;
    }

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
