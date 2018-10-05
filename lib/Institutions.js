'use strict';

const APIClient = require('./APIClient.js');

const Institutions = {

  get(client, callback) {
    const config = {
      client: client
    }

    let url = `${client.baseUrl}/institutions`;

    APIClient.get(url, config, (err, json) => {
      if (err) {
        callback(err);
      } else {
        callback(null, json);
      }
    });
  }
};

module.exports = Institutions;
