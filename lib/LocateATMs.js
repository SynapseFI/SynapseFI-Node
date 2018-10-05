'use strict';

const APIClient = require('./APIClient.js');

const LocateATMs = {

  get(user, options, callback) {
    const config = {
      client: user.client,
      ip_address: user.ip_address,
      fingerprint: user.fingerprint,
      oauth_key: user.oauth_key
    };

    let url = `${user.client.baseUrl}/nodes/atms`;

    if (options) {
      const queryParams = [];

      if (options.zip) {
        queryParams.push(`zip=${options.zip}`);
      }
      if (options.lat) {
        queryParams.push(`lat=${options.lat}`);
      }
      if (options.lon) {
        queryParams.push(`lon=${options.lon}`);
      }
      if (options.radius) {
        queryParams.push(`radius=${options.radius}`);
      }
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
  }
};

module.exports = LocateATMs;
