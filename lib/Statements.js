'use strict';

const APIClient = require('./APIClient.js');

const Statements = {

  get(user, options, callback) {
    const config = {
      client: user.client,
      ip_address: user.ip_address,
      fingerprint: user.fingerprint,
      oauth_key: user.oauth_key
    };

    let url = user.json._links.self.href;

    if (options) {
      // if nodeID provided to retrieve statements by node
      if (options._id) {
        url += `/nodes/${options._id}/statements`;
        if (options.page && options.per_page) {
          url += `?page=${options.page}&per_page=${options.per_page}`;
        } else if (options.page) {
          url += `?page=${options.page}`;
        } else if (options.per_page) {
          url += `?per_page=${options.per_page}`;
        }

        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, json);
          }
        });
      // retrieving statements by user
      } else {
        url += '/statements'
        if (options.page && options.per_page) {
          url += `?page=${options.page}&per_page=${options.per_page}`;
        } else if (options.page) {
          url += `?page=${options.page}`;
        } else if (options.per_page) {
          url += `?per_page=${options.per_page}`;
        }

        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, json);
          }
        });
      }
    } else {
      url += '/statements';
      APIClient.get(url, config, (err, json) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, json);
        }
      });
    }
  }
}

module.exports = Statements
