const APIClient = require('./APIClient.js');
const User = require('./User.js');

const Users = {

  get: function(client, options, callback) {
    const config = {
      'client': client
    };
    const url = `${client.baseUrl}/users`;

    if (options) {
      if (options._id) {
        if (!options.fingerprint) {
          callback(new Error('Missing options "fingerprint" when getting specific user.'));
        } else if (!options.ip_address) {
          callback(new Error('Missing options "ip_address" when getting specific user.'));
        } else {
          config.ip_address = options.ip_address;
          config.fingerprint = options.fingerprint;
          url += '/' + String(options._id);
          APIClient.get(url, config, function(err, json) {
            if (err) {
              callback(err);
            } else {
              new User(client, json, options.ip_address, options.fingerprint, callback);
            }
          });
        }
      } else {
        if (options.page && options.query) {
          url += `?page=${options.page}&query=${options.query}`;
        }
        else {
          if (options.page) {
            url += `?page=${options.page}`;
          }
          else if (options.query) {
            url += `?query=${options.query}`;
          }
        }

        APIClient.get(url, config, callback);
      }
    }
    else {
      APIClient.get(url, config, function(err, json) {
        callback(err, json);
      });
    }
  },

  create: function(client, fingerprint, ip_address, payload, callback) {
    const config = {
      client: client,
      fingerprint: fingerprint,
      ip_address: ip_address
    };
    const url = client.baseUrl + '/users';
    APIClient.post(url, config, payload, function(err, json) {
      if (err) {
        callback(err);
      } else {
        new User(client, json, ip_address, fingerprint, callback);
      }
    });
  }
};

module.exports = Users;
