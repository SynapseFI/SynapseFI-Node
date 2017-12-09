'use strict';

const request = require('superagent');

const APIClient = {

  delete(url, config, callback) {
    const headers = generateHeaders(config);
    request
      .delete(url)
      .set(headers)
      .end(function(err, res) {
        if (err) {
          callback(err);
        } else {
          callback(err, res.body);
        }
      });
  },

  get(url, config, callback) {
    const headers = generateHeaders(config);
    request
      .get(url)
      .set(headers)
      .query(config.query)
      .end(function(err, res) {
        if (err) {
          callback(err);
        } else {
          callback(err, res.body);
        }
      });
  },

  patch(url, config, payload, callback) {
    const headers = generateHeaders(config);
    request
      .patch(url)
      .set(headers)
      .send(JSON.stringify(payload))
      .end(function(err, res) {
        if (err) {
          callback(err);
        } else {
          if (res.status !== 200) {
            const acceptedError = {
              status: res.status,
              body: res.body
            };
            callback(acceptedError);
          } else {
            callback(err, res.body);
          }
        }
      });
  },

  post(url, config, payload, callback) {
    const headers = generateHeaders(config);
    request
      .post(url)
      .set(headers)
      .send(JSON.stringify(payload))
      .end(function(err, res) {
        if (err) {
          callback(err);
        } else {
          if (res.status !== 200) {
            const acceptedError = {
              status: res.status,
              body: res.body
            };
            callback(acceptedError);
          } else {
            callback(err, res.body);
          }
        }
      });
  }
};

/*
  config -> {
    client: client instance,
    oauth_key: string,
    fingerprint: string,
    ip_address: string
  }
 */
const generateHeaders = (config) => {
  let oauth_key = '';
  let ip_address = '';
  let fingerprint = '';
  if (config.oauth_key) {
    oauth_key = config.oauth_key;
  }
  if (config.ip_address) {
    ip_address = config.ip_address;
  }
  if (config.fingerprint) {
    fingerprint = config.fingerprint;
  }
  const headers = {
    'X-SP-GATEWAY': config.client.client_id + '|' + config.client.client_secret,
    'X-SP-USER': oauth_key + '|' + fingerprint,
    'X-SP-USER-IP': ip_address,
    'X-SP-LANG': 'en',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (config.idempotency_key) {
    headers['X-SP-IDEMPOTENCY-KEY'] = String(config.idempotency_key);
  }
  return headers;
};

module.exports = APIClient;
