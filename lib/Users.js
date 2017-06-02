'use strict';

const APIClient = require('./APIClient.js');
const User = require('./User.js');
const Helpers = require('./Helpers.js');

const Users = {
  /** Gets all users or one user (if given userId)
    * @param client [object] : contains client_id, client_secret, is_production
    * @param options [object] e.g. (if getting one user) 
                                const options = {
                                  _id: USER_ID,
                                  fingerprint: USER_FINGERPRINT,
                                  ip_address: Helpers.getUserIP(),
                                  full_dehydrate: 'yes' //optional
                                };
                              e.g. (if getting all users)
                                const options = {
                                  ip: Helpers.getUserIP(),
                                  page: '', //optional
                                  per_page: '', //optional
                                  query: '' //optional
                                };
    * @param callback [function] 
        e.g. function(error, userObj) {
          // do something 
        }
  **/
  get(client, options, callback) {
    const config = {
      'client': client
    };
    let url = `${client.baseUrl}/users`;

    if (options) {
      if (!options.ip_address) {
        callback(new Error('Missing options "ip_address".'));
      } else {
        config.ip_address = options.ip_address;
      }
      // if user_id provided
      if (options._id) {
        if (!options.fingerprint) {
          callback(new Error('Missing options "fingerprint" when getting specific user.'));
        } else {
          config.fingerprint = options.fingerprint;
          url += '/' + String(options._id);
          // optional query param 
          if (options.full_dehydrate) {
            url += `?full_dehydrate=${options.full_dehydrate}`;
          }
          APIClient.get(url, config, (err, json) => {
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
    } else {
      APIClient.get(url, config, (err, json) => {
        callback(err, json);
      });
    }
  },

  /** Create a user
    * @param client [Object]
    * @param fingerprint [String] : the device that is trying to access a user's information
    * @param ip_address [String] : ip address of user
    * @param payload [Object] : Look at docs for format (https://docs.synapsepay.com/docs/create-a-user)
    * @param callback [function(error, userResponseObj)]
  **/
  create(client, fingerprint, ip_address, payload, callback) {
    const config = {
      client: client,
      fingerprint: fingerprint,
      ip_address: ip_address
    };
    const url = client.baseUrl + '/users';
    APIClient.post(url, config, payload, (err, json) => {
      if (err) {
        callback(err);
      } else {
        new User(client, json, ip_address, fingerprint, callback);
      }
    });
  }
};

module.exports = Users;
