'use strict';

const APIClient = require('./APIClient.js');

const PublicKey = {

  get(client, options, callback) {
    const config = {
      'client': client
    };
    let url = `${client.baseUrl}/client`;

    if (options) {
      if (options.scope) {
        url+=`?issue_public_key=YES&scope=${options.scope}`;
        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      } else {
      	url+=`?issue_public_key=YES&scope=OAUTH|POST,USERS|POST,USERS|GET,USER|GET,USER|PATCH,SUBSCRIPTIONS|GET,SUBSCRIPTIONS|POST,SUBSCRIPTION|GET,SUBSCRIPTION|PATCH,CLIENT|REPORTS,CLIENT|CONTROLS`;
        APIClient.get(url, config, (err, json) => {
          if (err) {
            callback(err);
          } else {
            callback(null, json);
          }
        });
      }
    } else {
      url+=`?issue_public_key=YES&scope=OAUTH|POST,USERS|POST,USERS|GET,USER|GET,USER|PATCH,SUBSCRIPTIONS|GET,SUBSCRIPTIONS|POST,SUBSCRIPTION|GET,SUBSCRIPTION|PATCH,CLIENT|REPORTS,CLIENT|CONTROLS`;
      APIClient.get(url, config, (err, json) => {
        if (err) {
          callback(err);
        } else {
          callback(null, json);
        }
      });
    }
  }
};

module.exports = PublicKey;

