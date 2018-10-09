'use strict';

const APIClient = require('./APIClient.js');

const Crypto = {

  getQuotes(client, callback) {
    const config = {
      client: client
    };

    let url = client.baseUrl + '/nodes/crypto-quotes';

    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, json);
      }
    });
  },

  getMarketData(client, options, callback) {
    const config = {
      client: client
    };

    let url = `${client.baseUrl}/nodes/crypto-market-watch`;

    if (options) {
      const pathParams = [];

      if (options.limit) {
        pathParams.push(`limit=${options.limit}`);
      }
      if (options.currency) {
        pathParams.push(`currency=${options.currency}`);
      }
      if (pathParams.length > 0) {
        url += `?${pathParams.join('&')}`;
      }
    }

    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, json);
      }
    });
  }
};

module.exports = Crypto;
