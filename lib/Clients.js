'use strict';

/**
  * @param clientId [String]
  * @param clientSecret [String]
  * @param isProduction [boolean]
**/

const Clients = function(clientId, clientSecret, isProduction) {
  this.client_id = clientId;
  this.client_secret = clientSecret;
  this.isProduction = isProduction;
  this.baseUrl = 'https://synapsepay.com/api/3';
  if (!this.isProduction) {
    this.baseUrl = 'https://uat-api.synapsefi.com/v3.1';
  }
};

module.exports = Clients;
