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
        const nodeParams = [];

        if (options.page) {
          nodeParams.push(`page=${options.page}`);
        }
        if (options.per_page) {
          nodeParams.push(`per_page=${options.per_page}`);
        }
        if (nodeParams.length > 0) {
          url += `?${nodeParams.join('&')}`;
        }

        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      // retrieving statements by user
      } else {
        url += '/statements'
        const userParams = [];

        if (options.page) {
          userParams.push(`page=${options.page}`);
        }
        if (options.per_page) {
          userParams.push(`per_page=${options.per_page}`);
        }
        if (userParams.length > 0) {
          url += `?${userParams.join('&')}`;
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
      url += '/statements';
      APIClient.get(url, config, (err, json) => {
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  }
}

module.exports = Statements
